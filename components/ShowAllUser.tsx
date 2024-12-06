import { UserType } from "@/lib/types"

export default function ShowAllUser({data }: {data: UserType[]}) {

   return (
    <div>
        {data.map((user) => (
            <div key={user.id}>
                {user.name}
            </div>
        ))}
    </div>
   ) 
}


// learn typescript