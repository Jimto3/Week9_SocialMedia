"use server";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";

export default async function AddLike(active, reply, comment_id) {
    const { userId } = auth();
    const { rows } = await sql`SELECT id FROM fb_users WHERE auth_id=${userId}`;
    if (active) {
        if (reply) {
            await sql`INSERT INTO fb_replylikes (reply_id, user_id) VALUES (${comment_id}, ${rows[0].id})`;
        } else {
            await sql`INSERT INTO fb_commentlikes (comment_id, user_id) VALUES (${comment_id}, ${rows[0].id})`;
        }
    } else {
        if (reply) {
            await sql`DELETE FROM fb_replylikes WHERE reply_id=${comment_id} AND user_id=${rows[0].id}`;
        } else {
            await sql`DELETE FROM fb_commentlikes WHERE comment_id=${comment_id} AND user_id=${rows[0].id}`;
        }
    }
}
