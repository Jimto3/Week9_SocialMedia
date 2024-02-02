"use client";
import Image from "next/image";
import Like from "@/../public/Like.png";
import { useState } from "react";
import AddLike from "./AddLike";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function LikeButton({
    liked,
    reply,
    comment_id,
    validate,
    likeamount,
}) {
    const [active, setActive] = useState(liked);
    const [likes, setLikes] = useState(likeamount);
    return (
        <>
            <Image
                src={Like}
                alt="Like Button"
                height={20}
                style={{ filter: `brightness(${active ? `100%` : `0%`})` }}
                onMouseOver={() => setActive(!active)}
                onMouseOut={() => setActive(!active)}
                onClick={() => handleClick()}
            />
            <h2 className="text-xl font-mono font-bold">{likes}</h2>
        </>
    );

    function handleClick() {
        AddLike(active, reply, comment_id);
        setActive(!active);
        validate();
        if (active) {
            setLikes(likes + 1);
        } else {
            setLikes(likes - 1);
        }
    }
}
