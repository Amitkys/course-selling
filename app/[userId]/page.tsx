import { getAllUserPosts } from "@/lib/actions/user";
import { RenderAllPostOfUser } from "@/components/RenderAllPostOfUser";


export default async function User({ params }: { params: { userId: string } }) {
    const { userId } = params;
    const posts = await getAllUserPosts(userId);
    return (
        <div>
            <div>hello</div>
            <RenderAllPostOfUser posts={posts} />
        </div>
    );
}
