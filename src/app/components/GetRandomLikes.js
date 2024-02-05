"use server";

import Link from "next/link";

export default async function GetRandomLikes(post, id, name) {
    // console.log(id);
    let user1 = "";
    let user2 = "";

    if (post.rows.length <= 2) {
        if (post.rows.length == 0) {
            return "No one has liked this post yet :(";
        } else if (post.rows.length == 1) {
            return (
                <h2>
                    <Link
                        href={`/posts/${post.rows[0].id}`}
                        className="text-white"
                    >
                        {post.rows[0].name}
                    </Link>{" "}
                    has liked this post
                </h2>
            );
        }
        return (
            <h2>
                <Link href={`posts/${id[0]}`} className="text-white">
                    {name[0]}
                </Link>{" "}
                and{" "}
                <Link href={`posts/${id[1]}`} className="text-white">
                    {name[1]}
                </Link>{" "}
                have liked this post
            </h2>
        );
    }
}
