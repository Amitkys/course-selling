"use client";
import { UserType } from "@/lib/types"
import { makeAdmin, removeAdmin } from "@/lib/actions/user"
import { useFormStatus } from "react-dom";

export default function ShowAllUser({data }: {data: UserType[]}) {
    const { pending } = useFormStatus();
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
                {/* {
                    user.isAdmin ? 
                    <button disabled={pending} onClick={async() => await removeAdmin(user.id)}>{pending ? "processing": "remove admin"}</button>
                    :
                    <button onClick={ async () => await makeAdmin(user.id)}>Make Admin</button>
                } */}
                {user.isAdmin ? (
                    <button
                        disabled={pending}
                        onClick={async () => await removeAdmin(user.id)}
                    >
                        {pending ? "processing" : "remove admin"}
                    </button>
                ) : (
                    <button
                        disabled={pending} 
                        onClick={async () => await makeAdmin(user.id)}
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