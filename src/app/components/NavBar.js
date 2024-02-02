import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { sql } from "@vercel/postgres";

export default async function NavBar() {
    const { userId } = auth();
    const { rows } = await sql`SELECT * FROM fb_users WHERE auth_id=${userId}`;
    if (rows.length === 0) {
        return;
    }

    const navItems = [
        { id: 0, path: `/posts`, title: "Home" },
        { id: 1, path: `/posts/${rows[0].id}`, title: "Your Posts" },
        { id: 2, path: `/followers/${rows[0].id}`, title: "Followers" },
        { id: 3, path: `/following/${rows[0].id}`, title: "Following" },
    ];

    await delay(500);
    return (
        <nav
            className={`bg-blue-500 h-[10vh] grid`}
            style={{
                gridTemplateColumns: `50px repeat(${navItems.length}, 1fr)`,
            }}
        >
            <div className="flex justify-center items-center">
                <UserButton afterSignOutUrl="/" />
            </div>
            {navItems.map((nav) => {
                return (
                    <div
                        key={nav.title}
                        className="flex justify-center items-center"
                    >
                        <Link
                            href={nav.path}
                            className="underline font-bold font-mono text-2xl text-white hover:text-black transition-colors"
                        >
                            {nav.title}
                        </Link>
                    </div>
                );
            })}
        </nav>
    );

    async function delay(timeout) {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    }
}
