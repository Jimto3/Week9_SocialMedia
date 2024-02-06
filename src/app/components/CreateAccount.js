import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import FormButton from "./FormButton";

export default async function CreateAccount() {
    const { userId } = auth();
    const { rowCount } =
        await sql`SELECT * FROM fb_users WHERE auth_id=${userId}`;
    //redirect user back to homepage if they already have an account
    return (
        <div>
            <form
                className="flex flex-col items-center justify-center gap-4 mt-4"
                action={handleSubmit}
            >
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                        className="border-2 border-gray-400 rounded ml-3"
                        name="name"
                        id="name"
                        placeholder="Doe John"
                        required
                    />
                </div>
                <div className="flex">
                    <label htmlFor="bio">Bio: </label>
                    <textarea
                        className="w-[400px] h-[200px] border-2 border-gray-400 rounded ml-3"
                        name="bio"
                        id="bio"
                        placeholder="I like Coding Everything in assembly (Best Language)"
                        required
                    />
                </div>
                <FormButton>Submit</FormButton>
            </form>
        </div>
    );

    async function handleSubmit(formData) {
        "use server";
        const usernameCheck =
            await sql`SELECT * FROM fb_users WHERE name=${formData.get(
                "name"
            )}`;
        if (usernameCheck.length == 0) {
            await sql`INSERT INTO fb_users(name, bio, auth_id) VALUES (${formData.get(
                "name"
            )}, ${formData.get("bio")}, ${userId})`;
            revalidatePath("/");
            redirect("/");
        } else {
            alert("Username Already Taken");
        }
    }
}
