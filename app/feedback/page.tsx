import RenderFeedback from "@/components/ui/posts/renderFeedback";
import { getPost, getSessionFromServer } from "@/lib/actions/action";
import { MainRenderPageType, UserSession } from "@/lib/definitions";

export default async function FeedbackServer() {
    // Fetch the logged-in user's session
    const session: UserSession = await getSessionFromServer();

    // Fetch posts based on session availability
    const data: MainRenderPageType[] = session && session.user 
        ? await getPost(true) 
        : await getPost(false);

    return (
        <div>
            {/* Pass posts and session to the child component */}
            <RenderFeedback posts={data} session={session} />
        </div>
    );
}
