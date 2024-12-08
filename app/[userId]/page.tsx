import { getAllUserPosts } from "@/lib/actions/user";
import { RenderAllPostOfUser } from "@/components/RenderAllPostOfUser";


export default async function User({ params }: { params: { userId: string } }) {
    const { userId } = params;
    const posts = await getAllUserPosts(userId);
    return (
        <div>
            {(posts.length > 0) ?

                <RenderAllPostOfUser posts={posts} />
                :
                (
                    <div className="flex h-screen items-center justify-center">
                        <div>You have not created any post yet.</div>
                    </div>
                )
            }
        </div>
    );
}
