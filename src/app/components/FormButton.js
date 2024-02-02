"use client";
import { useFormStatus } from "react-dom";

export default function FormButton({ children, wait }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-blue-500 hover:bg-blue-600 transition-colors text-white font-bold border-2 border-black rounded p-2 text-center w-[150px] animate-pulse"
        >
            {pending ? wait : children}
        </button>
    );
}
