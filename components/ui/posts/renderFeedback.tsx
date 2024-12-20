"use client";
// ui imports
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'; // material ui/icon
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

// server action function
import  {handleDislike, handleLike} from "@/lib/actions/action";
import { UserSession } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";
// import utility
import * as React from "react"
// import { poppin } from "@/components/fonts";
import { inter } from "@/components/fonts";
import { MainRenderPageType } from "@/lib/definitions";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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



export default  function RenderFeedback(
    {
        posts,
        session
    }: {
        posts: MainRenderPageType[];
        session: UserSession;
    }
) {
    
    const {toast} = useToast();

    return (
        <div className="flex justify-center items-center  border rounded  space-y-2">
            <div className={inter.className}>
                <h3>Students  Feedback</h3>
                <div className="grid grid-cols-1  justify-center space-y-2">
                    {posts.map((post: MainRenderPageType) => ( // getting 'posts' from component props
                        <Card key={post.id} className="w-[600px] mx-auto">

                            {/* info about: user and teacher */}
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    {/* Checking session, if user verified, show their name and roll number, else show a special message: 'anonymous' */}
                                    <CardTitle className="text-lg font-normal text-zinc-400 flex items-center">
                                        <Avatar>
                                            <AvatarImage
                                                className=""
                                                src={
                                                    session && session.user
                                                        ? post.author.avatar
                                                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbNbJ-fbEIoG7yXDjpCjacHB4VHgh35lJ-_fXoLJebS0vAGgp-WViWeN6WJ9hJtvQnnCQ&usqp=CAU'
                                                }
                                            />
                                            <AvatarFallback>...</AvatarFallback>
                                        </Avatar>
                                        {/* Here, 5 will appear horizontally next to the profile */}
                                        <div className="ml-2 text-sm font-medium text-zinc-400">• {session && session.user ? post.rollNumber : '• •'}</div>
                                    </CardTitle>
                                    <CardTitle className={`text-zinc-400 text-xs ${inter.className} antialiased`}>
                                        {formatDateTime(post.createdAt)}
                                    </CardTitle>
                                </div>
                                <hr />
                                <div className="flex justify-center">
                                    <CardTitle className="text-green-600">Teacher: {post.teacher}</CardTitle>
                                </div>
                                <hr />
                            </CardHeader>

                            {/* student feedback*/}
                            <CardContent className="flex justify-center mb-5">
                                <CardDescription  className={`${inter.className} antialiased text-lg    `}>{post.statement}</CardDescription>
                                <br />
                            </CardContent>

                            {/* button for Like and DisLike */}
                            <CardFooter className="flex justify-around">

                                {/* Like button */}
                                <div className="flex flex-col justify-center">
                                    {/* if user logged in, enable Like feature*/}
                                    {session && session.user ?
                                        <button onClick={async () => await handleLike(post.id)}>  {/* handleLike is server action function*/}
                                            {/* if they Liked: show filled icon else outline icon */}
                                            <div>
                                                {(post.likeStatus) ? <ThumbUpIcon className="text-green-700" /> : <ThumbUpOutlinedIcon className="text-zinc-400 hover:text-green-700 "/>}
                                            </div>
                                        </button>
                                        // if user is not logged in, simply thow them a outline icon
                                        :
                                        <button onClick={() => toast({ title: 'Login to React', variant: 'kys' })}>
                                            <div>
                                                <ThumbUpOutlinedIcon className="text-zinc-400   "></ThumbUpOutlinedIcon>
                                            </div>
                                        </button>
                                    }
                                    {/* always show like count */}
                                    <div className="ml-1 text-zinc-400">{formatNumber(post.likeCount)}</div>
                                </div>

                                {/* Dislike Button */}
                                <div className="flex justify-center flex-col">
                                    {/* if user logged in, enable dislike feature */}
                                    {session && session.user ?
                                        <button onClick={async () => await handleDislike(post.id)}> {/* handleDislike is a server function */}
                                            <div className="flex flex-col justify-center">
                                                {(post.dislikeStatus) ? <ThumbDownIcon className="text-red-700" /> : <ThumbDownOutlinedIcon className="text-zinc-400"/>}
                                            </div>
                                        </button>
                                        // if user is not logged in
                                        :
                                        <button onClick={() => toast({ title: 'Login to React' })}>
                                            <div>
                                                <ThumbUpOutlinedIcon className="text-zinc-400"></ThumbUpOutlinedIcon>
                                            </div>
                                        </button>
                                    }
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