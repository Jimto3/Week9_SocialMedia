"use client";
import * as HoverCard from "@radix-ui/react-hover-card";
import LikeButton from "./LikeButton";

export default function HoverLike({
    children,
    liked,
    reply,
    comment_id,
    likeamount,
    reply_id,
}) {
    // console.log(comment_id);
    return (
        <HoverCard.Root>
            <HoverCard.Trigger>
                <LikeButton
                    liked={liked}
                    reply={reply}
                    comment_id={comment_id}
                    likeamount={likeamount}
                    reply_id={reply_id}
                />
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content
                    className="bg-red-500 p-[2px] rounded border-2 border-black font-mono"
                    side="right"
                    sideOffset={10}
                >
                    {/* hello */}
                    {children}
                    <HoverCard.Arrow className="fill-none" />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
}
