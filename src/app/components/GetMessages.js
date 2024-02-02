import { sql } from "@vercel/postgres";
import Link from "next/link";
import ReplyDropdown from "./ReplyDropdown";
import { auth } from "@clerk/nextjs";
import LikeButton from "./LikeButton";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import HoverLike from "./HoverLike.js";

export default async function getMessages({ post, reply }) {
    const { userId } = auth();
    const { rows } =
        await sql`SELECT * FROM fb_replies WHERE comment_id=${post.id}`;

    const user =
        await sql`SELECT fb_users.auth_id FROM fb_users WHERE id=${post.user_id}`;

    const currentUser =
        await sql`SELECT * FROM fb_users WHERE auth_id=${userId}`;

    let likes = null;
    let likeCheck = null;
    if (reply) {
        likes =
            await sql`SELECT * FROM fb_replylikes WHERE reply_id=${post.id}`;
        likeCheck =
            await sql`SELECT * FROM fb_replylikes WHERE user_id=${currentUser.rows[0].id}`;
    } else {
        likes =
            await sql`SELECT * FROM fb_commentlikes WHERE comment_id=${post.id}`;
        likeCheck =
            await sql`SELECT * FROM fb_commentlikes WHERE user_id=${currentUser.rows[0].id} AND comment_id=${post.id}`;
    }
    const likeMessage = GetRandomLikes();

    await delay(300);
    return (
        <div
            className="flex justify-center items-center flex-col gap-5 mt-5"
            key={post.id}
        >
            <div className="border-2 border-black rounded w-[500px]">
                <div
                    className="text-xl font-bold text-center bg-blue-400 rounded-tl-[2px] rounded-tr-[2px] border-b-2 border-black grid"
                    style={{ gridTemplateColumns: "100px 1fr 100px" }}
                >
                    {(user.rows.length != 0 &&
                        user.rows[0].auth_id == userId) ||
                    reply ? (
                        <div></div>
                    ) : (
                        <Link
                            href={`/reply/${post.id}`}
                            className="flex text-left text-base font-normal items-center underline text-purple-700 ml-4 hover:text-purple-800"
                        >
                            Add Reply
                        </Link>
                    )}
                    <div className="flex justify-center">
                        <Link
                            href={`/posts/${post.user_id}`}
                            className="hover:text-blue-700 w-fit"
                        >
                            {post.name}
                        </Link>
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="flex flex-row gap-2 mr-2 h-6">
                            <HoverLike
                                liked={likeCheck.rows.length != 0}
                                reply={reply}
                                comment_id={post.id}
                                validate={validate}
                                likeamount={likes.rows.length}
                            >
                                <h2>{likeMessage}</h2>
                            </HoverLike>
                        </div>
                    </div>
                </div>
                <h2 className="text-center min-h-[100px]">{post.message}</h2>

                <div className="text-right">
                    {reply ? null : rows.length === 0 ? (
                        <h3 className="pr-4">{`No Replies :(`}</h3>
                    ) : (
                        <ReplyDropdown content={rows} />
                    )}
                </div>
            </div>
        </div>
    );

    async function delay(timeout) {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    }

    async function validate() {
        "use server";
        revalidatePath("/posts");
        redirect("/posts");
    }

    async function GetRandomLikes() {
        let val1 = "";
        let val2 = "";

        if (likes.rows.length <= 2) {
            if (likes.rows.length == 0) {
                return "No one has liked this post yet :(";
            }

            const likeNames = await likes.rows.map(async (like) => {
                "use server";
                const likeName =
                    await sql`SELECT name FROM fb_users WHERE id=${like.user_id}`;
                console.log(likeName.rows[0].name);
                return `${likeName.rows[0].name}`;
            });
            // return likeNames;
            return `${likeNames} and ${likeNames[1]} have liked this post`;
        }

        while (val1 == val2) {
            const random1 =
                likes.rows[Math.floor(Math.random() * likes.rows.length)]
                    .user_id;
            const random2 =
                likes.rows[Math.floor(Math.random() * likes.rows.length)]
                    .user_id;
        }
        return async function getUserName() {
            val1 = await sql`SELECT name FROM fb_users WHERE id=${random1}`;
            val2 = await sql`SELECT name FROM fb_users WHERE id=${random2}`;
            return `${val1}, ${val2} and ${
                likes.rows.length - 2
            } More have liked this post!`;
        };
    }
}
