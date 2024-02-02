"use client";
import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import Link from "next/link";
//name, reply, comment_id
export default function CollapsibleDemo({ content }) {
    const [open, setOpen] = React.useState(false);
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
                    return (
                        <div
                            key={item.id}
                            className="flex flex-col items-center min-h-[100px] gap-4 border-t-2 border-gray-500 box-content"
                        >
                            <h2 className="bg-blue-300 w-full text-center font-bold">
                                {item.name}
                            </h2>
                            <h2>{item.reply}</h2>
                        </div>
                    );
                })}
            </Collapsible.Content>
        </Collapsible.Root>
    );
}
