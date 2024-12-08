"use client";
import { OpinionDataTypeForUser } from "@/lib/types"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar" 

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'; // material ui/icon
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

// server action function
import  {handleDislike, handleLike} from "@/lib/actions/action";

// import utility
import * as React from "react"
// import { useToast } from "@/hooks/use-toast";
import { poppin } from "@/components/fonts";
import { inter } from "@/components/fonts";
// import { useSession } from "next-auth/react";

// format date and time
function formatDateTime(dateString: Date): string {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date string");
    }

    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true }; // Format for time
    const time = new Intl.DateTimeFormat('en-US', options).format(date);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' }) // Abbreviated month
    const year = date.getFullYear().toString().slice(-2); // Last two digits of the year

    return `${time} • ${day} ${month}, ${year}`;
}

function formatNumber(value: number): string {
    if (value >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "b";
    } else if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
    } else if (value >= 1_000) {
        return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    } else {
        return value.toString();
    }
}


export  function RenderAllPostOfUser({posts}: {posts: OpinionDataTypeForUser[]}){
//       const { data: session } = useSession();

//   console.log("Session on the client:", session);
    return (
        
        <div className="flex justify-center items-center bg-zinc-900">
            
            <div> 
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 justify-center">
                    {posts.map((post: OpinionDataTypeForUser) => ( // getting 'posts' from component props
                        <Card key={post.id} className="w-[350px] mx-auto ">

                            {/* info about: user and teacher */}
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2" >
                                    <CardTitle  >
                                        <Avatar >
                                            <AvatarImage className="" src={post.author.avatar}  alt="@shadcn" />
                                            <AvatarFallback>...</AvatarFallback>
                                        </Avatar>
                                    </CardTitle>
                                    <CardTitle className={`text-zinc-400 text-xs ${inter.className} antialiased`}>{formatDateTime(post.createdAt)}</CardTitle>
                                </div>
                                <hr />
                                <div className="flex justify-center">
                                    <CardTitle className="text-green-600">Teacher: {post.teacher.name}</CardTitle>
                                </div>
                                <hr />
                            </CardHeader>

                            {/* student feedback*/}
                            <CardContent className="flex justify-center mb-5">
                                <CardDescription className={`${poppin.className } antialiased `} >{post.statement}</CardDescription>
                                <br />
                            </CardContent>

                            {/* button for Like and DisLike */}
                            <CardFooter className="flex justify-around">

                                {/* Like button */}
                                <div className="flex flex-col justify-center">
                                    {/* if user logged in, enable Like feature*/}
                                        <button onClick={async () => await handleLike(post.id)}>  {/* handleLike is server action function*/}
                                            {/* if they Liked: show filled icon else outline icon */}
                                            <div>
                                                {(post.reactions?.length > 0 && post.reactions[0]?.likeStatus) ? <ThumbUpIcon className="text-green-700" /> : <ThumbUpOutlinedIcon className="text-zinc-400 hover:text-green-700 "/>}
                                            </div>
                                        </button>
                                    {/* always show like count */}
                                    <div className="ml-1 text-zinc-400">{formatNumber(post.likeCount)}</div>
                                </div>

                                {/* Dislike Button */}
                                <div className="flex justify-center flex-col">
                                    {/* if user logged in, enable dislike feature */}
                                        <button onClick={async () => await handleDislike(post.id)}> {/* handleDislike is a server function */}
                                            <div className="flex flex-col justify-center">
                                                {(post.reactions?.length > 0 && post.reactions[0]?.dislikeStatus) ? <ThumbDownIcon className="text-red-700" /> : <ThumbDownOutlinedIcon className="text-zinc-400"/>}
                                            </div>
                                        </button>
                                    {/* dislike count */}
                                    <div className="ml-1 text-zinc-400">{formatNumber(post.dislikeCount)}</div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}