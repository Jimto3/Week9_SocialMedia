import { sql } from "@vercel/postgres";
import Link from "next/link";
import GetMessages from "../components/GetMessages";
import { Suspense } from "react";

export default async function PostsPage({ searchParams }) {
    const sort = searchParams.sort;
    const category = searchParams.category;
    let posts = await sql`SELECT * FROM fb_comments`;
    if (sort == "asc") {
        if (category) {
            posts =
                await sql`SELECT * FROM fb_comments AND category_id=${category} ORDER BY id ASC`;
        } else {
            posts = await sql`SELECT * FROM fb_comments ORDER BY id ASC`;
        }
    } else if (sort == "desc") {
        posts = await sql`SELECT * FROM fb_comments ORDER BY id DESC`;
    }

    return (
        <>
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
                            <GetMessages post={post} reply={false} />
                        </Suspense>
                    );
                })
            )}
        </>
    );
}
