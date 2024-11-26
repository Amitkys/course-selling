"use client";

import { useSession } from "next-auth/react";
import { addOpinion } from "@/lib/action";
import { Opinion } from "@/lib/types";
import { TeacherName } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";



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
                <label htmlFor="statement">Write Statement</label>
                <br />

                <Textarea
                    name="statement"
                    id="statement"
                    placeholder="write your opinion"
                    required
                ></Textarea>
                <br />
                
                <label htmlFor="teacher">select teacher</label>
                <br />
                <select name="teacher" id="teacher">
                    <option value="AMIT">AMIT</option>
                    <option value="KISHOR">KISHOR</option>
                </select>
                <br />
                <br />

                <Button variant={"secondary"} type="submit">submit</Button>
            </form>
        </div>

    )
}