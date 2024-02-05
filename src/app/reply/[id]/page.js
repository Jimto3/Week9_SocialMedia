import { sql } from "@vercel/postgres";
import GetMessages from "@/app/components/GetMessages";
import { Suspense } from "react";
import FormButton from "@/app/components/FormButton";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function ReplyPage({ params }) {
    const { rows } = await sql`SELECT * FROM fb_comments WHERE id=${params.id}`;
    const { userId } = auth();
    return (
        <div>
            <Suspense
                fallback={
                    <div className="flex justify-center items-center flex-col gap-5 mt-5">
                        <div className="w-[500px] h-[157px] bg-gray-300 rounded animate-pulse"></div>
                    </div>
                }
            >
                <GetMessages post={rows[0]} reply={false} />
            </Suspense>

            <div className="flex justify-center">
                <form className="mt-8" action={handleSubmit}>
                    <div className="flex gap-4 flex-col text-center items-center">
                        <label
                            htmlFor="message"
                            className="font-mono font-bold text-xl underline"
                        >
                            Reply
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            className="w-[500px] h-[150px] border-2 border-black bg-blue-500 text-white font-mono rounded p-2"
                            required
                        ></textarea>
                        <FormButton
                            wait="loading..."
                            type="submit"
                            className="bg-lime-400 hover:bg-lime-500 border-2 border-black rounded p-2 mt-4 w-[60%]"
                        >
                            Add Post
                        </FormButton>
                    </div>
                </form>
            </div>
        </div>
    );

    async function handleSubmit(formData) {
        "use server";
        const user = await sql`SELECT * FROM fb_users WHERE auth_id=${userId}`;
        await sql`INSERT INTO fb_replies(name, reply, comment_id, archive) VALUES (${
            user.rows[0].name
        }, ${formData.get("message")}, ${params.id}, ${false})`;
        revalidatePath(`/reply/${params.id}`);
        revalidatePath(`/posts`);
        revalidatePath(`/posts/${params.id}`);
        redirect(`/posts`);
    }
}
