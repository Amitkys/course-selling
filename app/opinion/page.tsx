"use client";

import { useSession } from "next-auth/react";
import { addOpinion } from "@/lib/actions/action";
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
import { useToast } from "@/hooks/use-toast";



export default  function opinion() {
    const handleForm  = async (formData: FormData) =>{
        await addOpinion(formData);
    }
    return (
        <div className="flex items-center  h-screen w-full flex-col">
            <form className="w-full mt-20"  action={handleForm}>

                <Select name="teacher">
                    <SelectTrigger className="w-[180px] text-sm lg:text-lg mb-3 font-bold">
                        <SelectValue placeholder="Select Teacher"></SelectValue>
                    </SelectTrigger>
                    <SelectContent >
                        <SelectItem className="text-sm lg:text-lg font-bold" value="AMIT">Amit</SelectItem>
                        <SelectItem className="text-sm lg:text-lg font-bold" value="KISHOR">Kishor</SelectItem>
                        <SelectItem className="text-sm lg:text-lg font-bold" value="ROHAN">Rohan</SelectItem>
                    </SelectContent>
                </Select>
                
                <Label className="text-sm lg:text-lg font-bold" htmlFor="statement">Write Statement</Label>
                <Textarea
                    rows={4}
                    name="statement"
                    id="statement"
                    placeholder="write your opinion"
                    required
                    className="mb-2  text-sm lg:text-lg font-bold"
                ></Textarea>
                <div className="flex justify-center">
                    <Button className="font-bold w-full lg:w-1/3 " type="submit">Submit</Button>
                </div>
            </form>
        </div>

    )
}