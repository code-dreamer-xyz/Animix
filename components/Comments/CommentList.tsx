import React from 'react'

import AddComment from './AddComment'
import Comment from './Comment'

const CommentList = ({ comments, movie_id }) => {
    return (
        <div>
            <h3 className="mb-8 text-white font-poppins underline text-xl">
                Comments
            </h3>
            <AddComment movie_id={movie_id} />
            {comments?.length > 0 &&
                comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
        </div>
    )
}

export default CommentList
