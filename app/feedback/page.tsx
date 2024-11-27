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
// server action function
import { getPost } from "@/lib/action"

export default function CardWithForm() {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <div className="flex justify-between mb-2" >
                    <CardTitle>Anonymouse(***)</CardTitle>
                    <CardTitle>3m ago</CardTitle>
                </div>
                <hr  />
                <div className="flex justify-center">
                    <CardTitle className="text-green-600">Teacher: Amit Kumar</CardTitle>
                </div>
                <hr />
                {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
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
        </Card>
    )
}
