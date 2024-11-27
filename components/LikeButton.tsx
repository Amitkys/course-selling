"use client";
import { handleLike, testing } from "@/lib/action"

export default function LikeButton({opinionId}:any){
    
    return (
        <div>
            <button onClick={ async () => await testing(opinionId)}>Like button</button>
        </div>
    )
}