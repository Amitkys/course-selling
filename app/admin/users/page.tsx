import ShowAllUser from "@/components/ShowAllUser";
import { getAllUsers } from "@/lib/actions/user"

export default async function PageUsers(){
    const data = await getAllUsers();
    return (
        <ShowAllUser data={data} />
    )
}