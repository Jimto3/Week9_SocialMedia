import FollowBox from "@/app/components/FollowBox";
import { sql } from "@vercel/postgres";

export default async function following({ params }) {
    const { rows } =
        await sql`SELECT fb_followers.followee_id AS id, fb_users.name, fb_users.bio FROM fb_followers
        JOIN fb_users ON fb_followers.followee_id = fb_users.id
        WHERE follower_id=${params.id}`;
    return (
        <div className="flex justify-center items-center flex-col gap-4">
            <h2 className="mt-4 text-3xl text-blue-500 font-mono font-bold ">
                Following
            </h2>
            {rows.length == 0 ? (
                <h2 className="font-bold text-3xl mt-4">{`You have No followers, sry :(`}</h2>
            ) : (
                rows.map((follower) => {
                    return <FollowBox follower={follower} key={follower.id} />;
                })
            )}
        </div>
    );
}
