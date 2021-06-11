import React from 'react'
import Button from '../components/ui/Button'

const NotFound = () => {
    return (
        <section className="min-h-screen flex items-center justify-center text-white">
            <div className="flex sm:flex-row items-center flex-col-reverse">
                <div className="text-center">
                    <h2 className="text-6xl font-main mb-4">404</h2>
                    <p className="text-2xl mb-4">Page not found</p>
                    <Button>Back Home</Button>
                </div>
                <div>
                    <img
                        className="max-w-full w-56 h-auto"
                        src="/404.png"
                        alt="not found"
                    />
                </div>
            </div>
        </section>
    )
}

export default NotFound
