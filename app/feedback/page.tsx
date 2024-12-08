import CardWithForm from "@/components/renderFeedback";
import { getPost, getSessionFromServer } from "@/lib/actions/action";
import { MainRenderPageType, UserSession } from "@/lib/types";

export default async function feedbackServer() {
    // Fetch the logged-in user's session
    const session: UserSession = await getSessionFromServer();

    // Fetch posts based on session availability
    const data: MainRenderPageType[] = session && session.user 
        ? await getPost(true) 
        : await getPost(false);

    return (
        <div>
            {/* Pass posts and session to the child component */}
            <CardWithForm posts={data} session={session} />
        </div>
    );
}
