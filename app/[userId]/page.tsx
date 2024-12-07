import { getAllUserPosts } from "@/lib/actions/user";
// import { RenderAllPostOfUser } from "@/components/RenderAllPostOfUser";


export default async function User({ params }: { params: { userId: string } }) {
    const { userId } = params;
    console.log(userId);
    const posts = await getAllUserPosts(userId);
    console.log(posts)

    return (
        <div>
            <div>hello</div>
            {/* <RenderAllPostOfUser posts={posts} /> */}
        </div>
    );
}
