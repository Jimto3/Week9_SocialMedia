import FormButton from "@/app/components/FormButton";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function AddPost({ params }) {
    const { userId } = auth();
    const { rows } = await sql`SELECT * from fb_users WHERE auth_id=${userId}`;
    const categories = await sql`SELECT * from fb_categories`;
    if (params.id != rows[0].id) {
        redirect(`/posts/${params.id}`);
    }

    return (
        <div className="flex justify-center">
            <form className="mt-8" action={handleSubmit}>
                <div className="flex gap-4 flex-col text-center items-center">
                    <label
                        htmlFor="message"
                        className="font-mono font-bold text-xl underline"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className="w-[500px] h-[150px] border-2 border-black bg-blue-500 text-white font-mono rounded p-2"
                        required
                    ></textarea>
                    <label
                        htmlFor="categories"
                        className="font-mono font-bold text-xl underline"
                    >
                        Category
                    </label>
                    <select
                        id="categories"
                        name="categories"
                        className="text-center"
                    >
                        {categories.rows.map((category) => {
                            return (
                                <option key={category.id} value={category.id}>
                                    {category.category}
                                </option>
                            );
                        })}
                    </select>
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
    );

    async function handleSubmit(formData) {
        "use server";
        const message = formData.get("message");
        const category = formData.get("categories");
        await sql`INSERT INTO fb_comments(user_id, name, message, category_id, archive) VALUES (${
            rows[0].id
        }, ${rows[0].name}, ${message}, ${category}, ${false})`;
        revalidatePath(`/posts/${params.id}`);
        revalidatePath("/posts");
        redirect(`/posts/${params.id}`);
    }
}
