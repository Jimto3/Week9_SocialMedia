import { sql } from "@vercel/postgres";
import Link from "next/link";
import GetMessages from "../components/GetMessages";
import { Suspense } from "react";

export default async function PostsPage() {
    const { rows } = await sql`SELECT * FROM fb_comments`;

    return rows.map((post) => {
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
    });
}
