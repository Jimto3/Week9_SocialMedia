"use server";
import Link from "next/link";

export default async function FollowBox({ follower }) {
    return (
        <div
            key={follower.id}
            className="border-2 border-black rounded min-w-[400px] min-h-[100px] text-center"
        >
            <h2 className="bg-blue-500">
                <Link
                    href={`/posts/${follower.id}`}
                    className="text-xl font-bold font-mono hover:text-white transition-colors"
                >
                    {follower.name}
                </Link>
            </h2>
            <h2 className="min-h-[75px]">{follower.bio}</h2>
        </div>
    );
}
