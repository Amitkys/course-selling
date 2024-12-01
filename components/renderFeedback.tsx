
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
import  {handleDislike, handleLike} from "@/lib/action";

// import utility
import * as React from "react"
import { useToast } from "@/hooks/use-toast";


export default  function CardWithForm({posts, session}: any) {
    
    const {toast} = useToast();

    return (
        <div>
            <h3>Students  Feedback</h3>
            <div>
                {posts.map((post: any) => ( // getting 'posts' from component props
                    <Card key={post.id} className="w-[350px]">

                    {/* info about: user and teacher */}
                        <CardHeader>
                            <div className="flex justify-between mb-2" >
                            {/* checking session, if user verified, show their name and roll number, else, show a special message: 'anonymouse' */}
                                <CardTitle>{session && session.user ? post.author.name : "anonymouse"}({session && session.user ? post.rollNumber : "***"})</CardTitle>
                                <CardTitle>3m ago</CardTitle>
                            </div>
                            <hr />
                            <div className="flex justify-center">
                                <CardTitle className="text-green-600">Teacher: {post.teacher}</CardTitle>
                            </div>
                            <hr />
                        </CardHeader>

                        {/* student feedback*/}
                        <CardContent className="flex justify-center mb-5">
                            <CardDescription>{post.statement}</CardDescription>
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
                                            {(post.likeStatus) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                                        </div>
                                    </button>
                                    // if user is not logged in, simply thow them a outline icon
                                    :
                                    <button onClick={() => toast({title: 'Login to React'})}>
                                        <div>
                                            <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                                        </div>
                                    </button>
                                }
                                {/* always show like count */}
                                <div className="ml-1">{post.likeCount}</div>
                            </div>

                            {/* Dislike Button */}
                            <div className="flex justify-center flex-col">
                                {/* if user logged in, enable dislike feature */}
                                {session && session.user ?
                                    <button onClick={async () => await handleDislike(post.id)}> {/* handleDislike is a server function */}
                                        <div className="flex flex-col justify-center">
                                            {(post.dislikeStatus) ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
                                        </div>
                                    </button>
                                    // if user is not logged in
                                    :
                                    <button onClick={() => toast({ title: 'Login to React' })}>
                                        <div>
                                            <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                                        </div>
                                    </button>
                                }
                                {/* dislike count */}
                                <div className="ml-1">{post.dislikeCount}</div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>  
        </div>
    )
}