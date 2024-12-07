"use client";
import { UserType } from "@/lib/types"
import { makeAdmin, removeAdmin } from "@/lib/actions/user"

export default function ShowAllUser({data }: {data: UserType[]}) {

   return (
    <div>
        {data.map((user) => (
            <div key={user.id}>
                <div>
                    {user.name}
                </div>
                <div>
                    {user.email}
                </div>
                {
                    user.isAdmin ? 
                    <button onClick={async() => await removeAdmin(user.id)}>Remove Admin</button>
                    :
                    <button onClick={ async () => await makeAdmin(user.id)}>Make Admin</button>
                }
                <hr />
            </div>
        ))}
    </div>
   ) 
}


// learn typescript