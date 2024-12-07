import { OpinionDataTypeForUser } from "@/lib/types"
export  function RenderAllPostOfUser({posts}: {posts: OpinionDataTypeForUser[]}){
    return (
        <div>
            {posts.map((post: OpinionDataTypeForUser) => (
                <div key={post.id}>
                    <div>{post.author.name}</div>
                </div>
            ))}
        </div>
    )
}