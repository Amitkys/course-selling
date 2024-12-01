import CardWithForm from "@/components/renderFeedback";
import { getPost, handleDislike, handleLike } from "@/lib/action";
import { getServerSession } from "next-auth";

export default async function feedbackServer() {
    const session = await getServerSession();
    let data;
    if (session && session.user) {
        data = await getPost(true);
    }else{
        data = await getPost(false);
    }

    return (
        <>
            <CardWithForm posts={data} session = {session} />
        </>
    )
}