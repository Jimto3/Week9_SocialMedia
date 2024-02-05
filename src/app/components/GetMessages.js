"use server";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import ReplyDropdown from "./ReplyDropdown";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import HoverLike from "./HoverLike.js";
import GetRandomLikes from "./GetRandomLikes";

export default async function getMessages({ post, reply }) {
    const { userId } = auth();
    const { rows } =
        await sql`SELECT * FROM fb_replies WHERE comment_id=${post.id}`;

    const user =
        await sql`SELECT fb_users.auth_id FROM fb_users WHERE id=${post.user_id}`;

    const currentUser =
        await sql`SELECT * FROM fb_users WHERE auth_id=${userId}`;

    const likes =
        await sql`SELECT fb_users.name, fb_users.id FROM fb_commentlikes JOIN fb_users ON fb_users.id = fb_commentlikes.user_id WHERE comment_id=${post.id}`;
    const likeCheck =
        await sql`SELECT * FROM fb_commentlikes WHERE user_id=${currentUser.rows[0].id} AND comment_id=${post.id}`;

    const likeNames = likes.rows.map((like) => like.name);
    const likeIds = likes.rows.map((like) => like.id);
    const likeMessage = GetRandomLikes(likes, likeIds, likeNames);
    // console.log(likeMessage);
    // console.log(likes);
    // console.log(`post: ${post}, post_id: ${post.id}`);

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
                        <div className="flex flex-row gap-2 mr-2">
                            <HoverLike
                                liked={likeCheck.rows.length != 0}
                                reply={false}
                                comment_id={post.id}
                                likeamount={likes.rows.length}
                            >
                                {likeMessage}
                            </HoverLike>
                        </div>
                    </div>
                </div>
                <h2 className="text-center min-h-[100px]">{post.message}</h2>

                <div className="text-right">
                    {reply ? null : rows.length === 0 ? (
                        <h3 className="pr-4">{`No Replies :(`}</h3>
                    ) : (
                        <ReplyDropdown
                            content={rows}
                            reply={true}
                            comment_id={post.id}
                        />
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
}

export async function validate() {
    "use server";
    revalidatePath("/posts");
}
