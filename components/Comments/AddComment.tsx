import Link from 'next/link'
import React, { useContext } from 'react'
import { UserContext } from '../../lib/context'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'

const AddComment = () => {
    const { user } = useContext(UserContext)

    return (
        <div className="flex space-x-4 mb-6">
            {user && (
                <>
                    <Avatar img={user.photoURL} />
                    <form action="#">
                        <input
                            type="text"
                            placeholder="Add a Comment"
                            className="bg-transparent border-b-2 border-gray-600 py-4"
                        />
                    </form>
                </>
            )}
            {!user && (
                <Button>
                    <Link href="/login">
                        <a>Login To Comment</a>
                    </Link>
                </Button>
            )}
        </div>
    )
}

export default AddComment
