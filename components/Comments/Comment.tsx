import React from 'react'
import Avatar from '../ui/Avatar'
import TimeAgo from 'timeago-react'

const Comment = ({ comment }) => {
    return (
        <div className="flex space-x-4 mb-6">
            <Avatar img={comment?.user_img} />
            <div>
                <div className="flex space-x-2 mb-4 items-center">
                    <p className="text-white text-xl font-sans">Zino</p>
                    <span className="text-md text-gray-500 font-sans">
                        {comment.createdAt && (
                            <TimeAgo
                                datetime={comment.createdAt.toDate()}
                                live={false}
                            />
                        )}
                    </span>
                </div>
                <p className="text-lg text-white font-sans">
                    {comment?.content}
                </p>
            </div>
        </div>
    )
}

export default Comment
