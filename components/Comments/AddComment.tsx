import React from 'react'
import Avatar from '../ui/Avatar'

const AddComment = () => {
    return (
        <div className="flex space-x-4 mb-6">
            <Avatar />
            <form action="#">
                <input
                    type="text"
                    placeholder="Add a Comment"
                    className="bg-transparent border-b-2 border-gray-600 py-4"
                />
            </form>
        </div>
    )
}

export default AddComment
