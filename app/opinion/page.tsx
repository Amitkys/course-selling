"use client";

import { useSession } from "next-auth/react";
import { addOpinion } from "@/lib/action";

interface Opinion {
    statement: string;
    teacher: string;
    authorId: string;
}

export default  function opinion() {
    const {data: session} = useSession();

    const handleSubmit = async(event:React.FormEvent) => {
        event.preventDefault();

        // creating for data object
        const formData = new FormData(event.target as HTMLFormElement)

        const data: Opinion = {
            statement: formData.get("statement") as string,
            teacher: formData.get("teacher") as string,
            authorId: session?.user?.id ?? "",
        }
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="statement">Write Statement</label>
                <br />

                <textarea
                    name="statement"
                    id="statement"
                    placeholder="write your opinion"
                    required
                ></textarea>
                <br />
                
                <label htmlFor="teacher">select teacher</label>
                <br />
                <select name="teacher" id="teacher">
                    <option value="AMIT">AMIT</option>
                    <option value="KISHOR">KISHOR</option>
                </select>
                <br />
                <br />

                <button type="submit">submit</button>
            </form>
        </div>

    )
}