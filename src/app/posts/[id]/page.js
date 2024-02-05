import { sql } from "@vercel/postgres";
import GetMessages from "@/app/components/GetMessages";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import FormButton from "@/app/components/FormButton";

export default async function UserPosts({ params, searchParams }) {
    const { userId } = auth();
    const currentUser = await sql`SELECT * from fb_users WHERE id=${params.id}`;
    const user = await sql`SELECT * FROM fb_users WHERE auth_id=${userId}`;
    const following =
        await sql`SELECT * FROM fb_followers WHERE follower_id=${user.rows[0].id} AND followee_id=${params.id}`;
    const sort = searchParams.sort;
    const category = searchParams.category;
    let posts = await sql`SELECT * FROM fb_comments WHERE user_id=${params.id}`;
    if (sort == "asc") {
        if (category) {
            posts =
                await sql`SELECT * FROM fb_comments WHERE user_id=${params.id} AND category_id=${category} ORDER BY id ASC`;
        } else {
            posts =
                await sql`SELECT * FROM fb_comments WHERE user_id=${params.id} ORDER BY id ASC`;
        }
    } else if (sort == "desc") {
        posts =
            await sql`SELECT * FROM fb_comments WHERE user_id=${params.id} ORDER BY id DESC`;
    }
    return (
        <div>
            {userId == currentUser.rows[0].auth_id ? null : (
                <form
                    action={handleFollow}
                    className="flex justify-center mt-4"
                >
                    <FormButton wait="...">
                        {following.rows.length == 0 ? "Follow" : "UnFollow"}
                    </FormButton>
                </form>
            )}
            {posts.rows.length == 0 ? (
                <h2 className="font-mono font-bold text-2xl">
                    There are currently no posts
                </h2>
            ) : (
                posts.rows.map((post) => {
                    return (
                        <Suspense
                            key={post.id}
                            fallback={
                                <div className="flex justify-center items-center flex-col gap-5 mt-5">
                                    <div className="w-[500px] h-[157px] bg-gray-300 rounded animate-pulse"></div>
                                </div>
                            }
                        >
                            <GetMessages
                                post={post}
                                reply={false}
                                key={post.id}
                            />
                        </Suspense>
                    );
                })
            )}
            {currentUser.rows[0].auth_id != user.rows[0].auth_id ? null : (
                <form
                    action={handleClick}
                    className="absolute top-[15vh] right-[5vw]"
                >
                    <button className="bg-lime-400 hover:bg-lime-500 transition-colors border-2 border-black p-2">
                        Add Post
                    </button>
                </form>
            )}
        </div>
    );

    async function handleClick() {
        "use server";
        redirect(`/posts/${params.id}/addPost`);
    }

    async function handleFollow() {
        "use server";
        if (following.rows.length == 0) {
            await sql`INSERT INTO fb_followers(followee_id, follower_id) VALUES (${params.id}, ${user.rows[0].id})`;
        } else {
            await sql`DELETE FROM fb_followers WHERE followee_id=${params.id} AND follower_id=${user.rows[0].id}`;
        }
        revalidatePath(`/posts/${params.id}`);
        revalidatePath(`/followers/${params.id}`);
        revalidatePath(`/following/${params.id}`);
    }
}
