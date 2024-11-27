// "use client";
import * as React from "react"

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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// server action function
import { getPost } from "@/lib/action"

export default async function CardWithForm() {
    const posts = await getPost();
    // console.log('here is all post', data);
    return (
        <div>
            <h3>Students Feedback</h3>
            <div>
                {posts.map((post) => (
                    <Card className="w-[350px]">
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
                            <button >
                                <div className="flex flex-col justify-center">
                                    <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                                    <div>{post.likeCount}</div>
                                </div>
                            </button>
                            <button>
                                <div className="flex flex-col justify-center">
                                    <ThumbDownOutlinedIcon />
                                    <div>{post.dislikeCount}</div>
                                </div>
                            </button>
                        </CardFooter>
                    </Card>
                ))}
            </div>  



















            "<Card className="w-[350px]">
                <CardHeader>
                    <div className="flex justify-between mb-2" >
                        <CardTitle>Anonymouse(***)</CardTitle> {/* star(*) stands for roll number */}
                        <CardTitle>3m ago</CardTitle>
                    </div>
                    <hr />
                    <div className="flex justify-center">
                        <CardTitle className="text-green-600">Teacher: Amit Kumar</CardTitle>
                    </div>
                    <hr />
                </CardHeader>
                <CardContent className="flex justify-center mb-5">
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                    <br />
                </CardContent>
                <CardFooter className="flex justify-around">
                    <button >
                        <div className="flex flex-col justify-center">
                            <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>
                            <div>5</div>
                        </div>
                    </button>
                    <button>
                        <div className="flex flex-col justify-center">
                            <ThumbDownOutlinedIcon />
                            <div>5</div>
                        </div>
                    </button>
                </CardFooter>
            </Card>"
        </div>
    )
}
