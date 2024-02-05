"use client";
import Image from "next/image";
import Like from "@/../public/Like.png";
import { useState } from "react";
import AddLike from "./AddLike";
import { validate } from "./GetMessages";

export default function LikeButton({
    liked,
    reply,
    comment_id,
    likeamount,
    reply_id,
}) {
    // console.log(`comment_id: ${comment_id}`);
    const [active, setActive] = useState(liked);
    const [likes, setLikes] = useState(likeamount);
    return (
        <div className="flex flex-row gap-2 items-center">
            <Image
                src={Like}
                alt="Like Button"
                style={{
                    filter: `brightness(${active ? `100%` : `0%`})`,
                    height: `20px`,
                    width: `auto`,
                }}
                onMouseOver={() => setActive(!active)}
                onMouseOut={() => setActive(!active)}
                onClick={() => handleClick()}
            />
            <h2 className="text-xl font-mono font-bold">{likes}</h2>
        </div>
    );

    function handleClick() {
        AddLike(active, reply, comment_id, reply_id);
        setActive(!active);
        validate();
        if (active) {
            setLikes(likes + 1);
        } else {
            setLikes(likes - 1);
        }
    }
}
