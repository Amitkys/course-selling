import CardWithForm from "@/components/renderFeedback";
import { getPost, getSessionFromServer } from "@/lib/actions/action";
// import { getServerSession } from "next-auth";
import { MainRenderPageType, UserSession } from "@/lib/types";

export default async function feedbackServer() {
    // getting user info from loggedin session
    const session: UserSession = await getSessionFromServer();
    let data : MainRenderPageType[];
    // if user is logged in: they can other name on post, and they can react
    if (session && session.user) {
        data = await getPost(true); // by passing 'true' means getting post conditionally (user is authorized)
    }else{
        // if user is not logged in: prevent them to react to other post
        data = await getPost(false); // by passing 'false' means user is not authorized and getting post accordingly
    }

    return (
        <>
            {/* passed data and user session to component */}
            <CardWithForm posts={data} session = {session} />
        </>
    )
}