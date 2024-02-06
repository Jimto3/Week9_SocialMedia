"use server";
import { sql } from "@vercel/postgres";
import HoverLike from "./HoverLike";
import { auth } from "@clerk/nextjs";
import GetRandomLikes from "./GetRandomLikes";

export default async function GetReplyLikes(item, comment_id) {
        // if (!item) {
        //     return;
        // }

        // const { userId } = auth();
        // const id = await sql`SELECT id FROM fb_users WHERE auth_id=${userId}`;
        // const likes =
        //     await sql`SELECT fb_replylikes.reply_id, fb_replylikes.user_id, fb_users.name FROM fb_replylikes JOIN fb_users ON user_id = fb_users.id WHERE reply_id=${item.item.id}`;
        // let liked = false;
        // likes.rows.map((reply) => {
        //     if (reply.user_id == id.rows.id) {
        //         liked = true;
        //     }
        // });
        // const replyLikeNames = likes.rows.map((like) => like.name);
        // const replyLikeIds = likes.rows.map((like) => like.id);
    // const likeMessage = GetRandomLikes(likes, replyLikeIds, replyLikeNames);

    return (
        // <HoverLike
        //     liked={liked}
        //     reply={true}
        //     comment_id={comment_id}
        //     reply_id={item.item.id}
        //     likeamount={likes.rows.length}
        // >
        <div>likeMessage</div>
        // </HoverLike>
    );
}
