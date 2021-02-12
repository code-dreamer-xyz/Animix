import React from 'react'
import MovieCard from '../../components/ui/MovieCard'
import UserNav from '../../components/UserNav'
import avatar from '../../images/avatarHolder.jpg'

import gintama from '../../images/gintama.jpg'

const UserProfile = () => {
    return (
        <section className="min-h-screen bg-theme flex items-center py-20">
            <div className="max-w-screen-xl mx-auto ">
                <div>
                    <div className="grid grid-cols-3 gap-6">
                        <MovieCard
                            img={gintama}
                            title="gintama"
                            genre="fantasy"
                        />
                        <MovieCard
                            img={gintama}
                            title="gintama"
                            genre="fantasy"
                        />
                        <MovieCard
                            img={gintama}
                            title="gintama"
                            genre="fantasy"
                        />
                        <MovieCard
                            img={gintama}
                            title="gintama"
                            genre="fantasy"
                        />
                    </div>
                    <UserNav img={avatar} userName="zino" />
                </div>
            </div>
        </section>
    )
}

export default UserProfile
