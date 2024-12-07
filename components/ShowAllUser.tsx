// "use client";
import { UserType } from "@/lib/types"
import { makeAdmin, removeAdmin } from "@/lib/actions/user"
import { useState } from "react";

export default function ShowAllUser({data }: {data: UserType[]}) {

    const [pending, setPending] = useState(false);
    const handleRemoveAdmin = async (id: string) => {
        setPending(true);
        try{
            await removeAdmin(id);
        }finally{
            setPending(false);
        }
    }
    const handleMakeAdmin = async (id: string) => {
        setPending(true);
        try{
            await makeAdmin(id);
        }finally{
            setPending(false);
        }
    }
   return (
    <div>
        {data.map((user: UserType) => (
            <div key={user.id}>
                <div>
                    {user.name}
                </div>
                <div>
                    {user.email}
                </div>
                {user.isAdmin ? (
                    <button
                        disabled={pending}
                        onClick={async () => await handleRemoveAdmin(user.id)}
                    >
                        {pending ? "processing" : "remove admin"}
                    </button>
                ) : (
                    <button
                        disabled={pending} 
                        onClick={async () => await handleMakeAdmin(user.id)}
                    >
                        {pending ? "Processing": "make admin"}
                    </button>
                )}
                <hr />
            </div>
        ))}
    </div>
   ) 
}


// learn typescript