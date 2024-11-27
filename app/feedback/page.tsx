import CardWithForm from "@/components/renderFeedback";
import { getPost } from "@/lib/action";

export default async function feedbackServer() {
    const data = await getPost();
    return (
        <>
            <CardWithForm posts={data} />
        </>
    )
}