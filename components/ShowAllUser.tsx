interface IuserTypes {
    name: string;
    email: string;
    id: string;
    avatar: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
}
export default function ShowAllUser({data }: {data: IuserTypes[]}) {

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