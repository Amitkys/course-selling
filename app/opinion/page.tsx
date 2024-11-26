"use client";

import { useSession } from "next-auth/react";
import { addOpinion } from "@/lib/action";
import { Opinion } from "@/lib/types";
import { TeacherName } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



export default  function opinion() {
    const {data: session} = useSession();

    const handleSubmit = async(event:React.FormEvent) => {
        event.preventDefault();

        // creating for data object
        const formData = new FormData(event.target as HTMLFormElement)

        const data: Opinion = {
            statement: formData.get("statement") as string,
            teacher: formData.get("teacher") as TeacherName,
            authorId: session?.user?.id ?? "",
        }

        try{
            await addOpinion(data);
            console.log('data added');
        }catch(e){
            console.log('something went wrong', e);
        }
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <Label htmlFor="statement">Write Statement</Label>

                <Textarea
                    name="statement"
                    id="statement"
                    placeholder="write your opinion"
                    required
                ></Textarea>
                
                <Select name="teacher">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Teacher"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="AMIT">Amit</SelectItem>
                        <SelectItem value="KISHOR">Kishor</SelectItem>
                        <SelectItem value="ROHAN">Rohan</SelectItem>
                    </SelectContent>
                </Select> 

                <Button variant={"secondary"} type="submit">submit</Button>
            </form>
        </div>

    )
}