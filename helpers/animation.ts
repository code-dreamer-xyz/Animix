export const animateUp = {
    transition: { duration: 2, delay: 1, ease: 'easeOut' },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
}

export const animateFade = {
    transition: { duration: 2, delay: 1, ease: 'easeOut' },
    initial: { opacity: 0 },
    animate: { opacity: 1 },
}

export const scaleUp = {
    exit: {
        opacity: 0,
        scale: 0,
        transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
        x: 100,
    },
    enter: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
    },
}

export const fadeInVariant = {
    visible: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.3,
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            when: 'afterChildren',
        },
    },
}

export const pageAnimation = {
    transition: {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.5,
    },
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
}

export const itemVariants = {
    initial: { scale: 1.4, x: 50, opacity: 0 },
    enter: {
        scale: 1,
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
    },
    exit: {
        scale: 0.6,
        x: 100,
        opacity: 0,
        transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
    },
}

export const slideUpVariants = {
    exit: {
        y: 150,
        opacity: 0,
        transition: { duration: 0.5, ease: 'easeInOut' },
    },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeInOut',
        },
    },
}

export const slideDownVariants = {
    exit: {
        y: -150,
        opacity: 0,
        transition: { duration: 0.5, ease: 'easeInOut' },
    },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeInOut',
        },
    },
}

export const textVariants = {
    exit: {
        y: 100,
        opacity: 0,
        transition: { duration: 0.5, ease: 'easeInOut' },
    },
    enter: {
        y: 0,
        opacity: 1,
        transition: { delay: 0.1, duration: 0.5, ease: 'easeInOut' },
    },
}

export const staggerChildren = {
    enter: (i = 0.1) => ({
        transition: {
            when: 'beforeChildren',
            staggerChildren: i,
        },
    }),
    exit: {
        transition: {
            when: 'afterChildren',
        },
    },
}
