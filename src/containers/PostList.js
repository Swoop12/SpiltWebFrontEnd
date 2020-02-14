import React from 'react';
import PostCard from '../components/ui/components/PostCard'
import PostCardPlaceholder from '../components/Placeholders/PostCardPlaceholder';

function PostList(props) {

    const posts = props.posts
    if (!posts) {
        return ([
            <PostCardPlaceholder />,
            <PostCardPlaceholder />,
            <PostCardPlaceholder />
        ])
    }

    if (posts.length < 1) {
        return (<p>No Posts Available ):</p>)
    }

    let postCards = posts.map((post) => {
        return (
            <li key={post._id}
                style={{
                    listStyleType: "none",
                    margin: "16px 0"
                }}>
                <PostCard post={post} />
            </li>
        )
    })

    return (
        <ol className="no-space">
            {postCards}
        </ol>
    )
}

export default PostList;
