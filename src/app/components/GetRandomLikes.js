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
                <Link href={`/posts/${id[0]}`} className="text-white">
                    {name[0]}
                </Link>{" "}
                and{" "}
                <Link href={`/posts/${id[1]}`} className="text-white">
                    {name[1]}
                </Link>{" "}
                have liked this post
            </h2>
        );
    } else {
        let name1 = Math.random() * name.length;
        let name2 = Math.random() * name.length;
        while (name1 == name2) {
            let name2 = Math.random() * name.length;
        }
        return (
            <h2>
                <Link href={`/posts/${id[name1]}`} className="text-white">
                    {name[name1]}
                </Link>
                ,{" "}
                <Link href={`/posts/${id[name2]}`} className="text-white">
                    {name[name2]}
                </Link>{" "}
                and ({name.length - 2}) others have liked this post.
            </h2>
        );
    }
}
