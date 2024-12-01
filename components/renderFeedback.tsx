
"use client";
import * as React from "react"
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
// when user click on like button, then ThumbUp component should be appear
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// when user click on dislike button, then ThumbDown component should be appear
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// server action function
import  {handleDislike, handleLike} from "@/lib/action";

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
                                    </button> :
                                    <button onClick={() => toast({title: 'Login to React'})}>
                                        <div>
                                            <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                                        </div>
                                    </button>
                                }
                                <div className="ml-1">{post.likeCount}</div>
                            </div>
                            <div className="flex justify-center flex-col">
                                {session && session.user ?
                                    <button onClick={async () => await handleDislike(post.id)}>
                                        <div className="flex flex-col justify-center">
                                            {(post.dislikeStatus) ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
                                        </div>
                                    </button> :

                                    <button onClick={() => toast({ title: 'Login to React' })}>
                                        <div>
                                            <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                                        </div>
                                    </button>
                                }
                                <div className="ml-1">{post.dislikeCount}</div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>  
        </div>
    )
}