
"use client";
import * as React from "react"
import { useState } from "react";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'; // material ui/icon
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
// when user click on like button, then ThumbUp component should be appear
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// when user click on dislike button, then ThumbDown component should be appear
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// server action function
import  {handleDislike, handleLike} from "@/lib/action";

export default  function CardWithForm({posts}: any) {
    let likedData: any;
    let disLikedData: any;
    // let isLiked: boolean = likedData.likeStatus;
    let isDisliked: boolean;
    console.log(likedData);
    return (
        <div>
            <h3>Students Feedback</h3>
            <div>
                {posts.map((post: any) => (
                    <Card key={post.id} className="w-[350px]">
                        <CardHeader>
                            <div className="flex justify-between mb-2" >
                                <CardTitle>{post.author.name}({post.rollNumber})</CardTitle> {/* star(*) stands for roll number */}
                                <CardTitle>3m ago</CardTitle>
                            </div>
                            <hr />
                            <div className="flex justify-center">
                                <CardTitle className="text-green-600">Teacher: {post.teacher}</CardTitle>
                            </div>
                            <hr />
                        </CardHeader>
                        <CardContent className="flex justify-center mb-5">
                            <CardDescription>{post.statement}</CardDescription>
                            <br />
                        </CardContent>
                        <CardFooter className="flex justify-around">
                            {/*button 1 */}
                            <div className="flex flex-col justify-center">
                                {/* <LikeButton opinionId={post.id} /> */}
                                <button onClick={async() => likedData = await handleLike(post.id)}>
                                    <div>
                                        {/* {
                                            isLiked ?<ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>: <ThumbUpIcon />
                                        } */}
                                       <ThumbUpOutlinedIcon /> 
                                    </div>
                                </button>
                                <div className="ml-1">{post.likeCount}</div>
                            </div>
                            <div className="flex justify-center flex-col">
                                <button onClick={async () => disLikedData= await handleDislike(post.id)}>
                                    <div className="flex flex-col justify-center">
                                        <ThumbDownOutlinedIcon />
                                    </div>
                                </button>
                                <div className="ml-1">{post.dislikeCount}</div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>  

        </div>
    )
}