import React from 'react'
import Avatar from '../ui/Avatar'

const Comment = () => {
    return (
        <div className="flex space-x-4 mb-6">
            <Avatar />
            <div>
                <div className="flex space-x-2 mb-4 items-center">
                    <p className="text-white text-xl font-sans">Zino</p>
                    <span className="text-md text-gray-500 font-sans">
                        1 mounth ago
                    </span>
                </div>
                <p className="text-lg text-white font-sans">
                    Gintama awsome as always i really enjoyed the movie.
                </p>
            </div>
        </div>
    )
}

export default Comment
