import CardWithForm from "@/components/renderFeedback";
import { getPost, handleDislike, handleLike } from "@/lib/action";
import { getServerSession } from "next-auth";

export default async function feedbackServer() {
    const session = await getServerSession();
    const data = await getPost();

    return (
        <>
            <CardWithForm posts={data} session = {session} />
        </>
    )
}