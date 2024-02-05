"use client";
import { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import GetReplies from "./GetReplies";
//name, reply, comment_id
export default function ReplyDropdown({ content, comment_id }) {
    const [open, setOpen] = useState(false);
    // console.log(comment_id);
    return (
        <Collapsible.Root
            className="CollapsibleRoot"
            open={open}
            onOpenChange={setOpen}
        >
            <Collapsible.Trigger asChild>
                <button className="text-purple-400 pr-4">{`View replies(${content.length})`}</button>
            </Collapsible.Trigger>
            <Collapsible.Content>
                {content.map((item) => {
                    console.log(item);
                    return (
                        <div
                            key={item.id}
                            className="flex flex-col items-center min-h-[100px] gap-4 border-t-2 border-gray-500 box-content"
                        >
                            <div
                                className="bg-blue-300 w-full text-center font-bold grid"
                                style={{
                                    gridTemplateColumns: "100px 1fr 100px",
                                }}
                            >
                                <div></div>
                                {item.name}
                                <div className="flex items-center justify-end">
                                    <div className="flex flex-row gap-2 mr-2">
                                        {/* <GetReplies
                                            item={item}
                                            comment_id={comment_id}
                                        /> */}
                                    </div>
                                </div>
                            </div>
                            <h2>{item.reply}</h2>
                        </div>
                    );
                })}
            </Collapsible.Content>
        </Collapsible.Root>
    );
}
