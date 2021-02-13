import React from 'react'
import AddComment from './AddComment'
import Comment from './Comment'

const CommentList = ({ comments }) => {
    return (
        <div>
            <h3 className="mb-8 text-white font-poppins underline text-xl">
                Comments
            </h3>
            <AddComment />
            {comments.map((comment) => (
                <Comment key={comment.user_id} comment={comment} />
            ))}
        </div>
    )
}

export default CommentList
