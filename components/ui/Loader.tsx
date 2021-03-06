import styles from '../../styles/loader.module.css'

const Loader = () => {
    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className={styles.loader} />
                <span className="text-white loading-text block mt-12">
                    "Loading..."
                </span>
            </div>
        </>
    )
}

export default Loader
