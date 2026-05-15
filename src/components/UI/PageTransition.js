import React from 'react'
import { motion } from 'framer-motion'

const pageVariants = {
	initial: {
		opacity: 0,
		x: 60,
	},
	in: {
		opacity: 1,
		x: 0,
	},
	out: {
		opacity: 0,
		x: -60,
	},
}

const pageTransition = {
	type: 'tween',
	ease: [0.25, 0.46, 0.45, 0.94],
	duration: 0.5,
}

const PageTransition = ({ children }) => {
	return (
		<motion.div
			initial='initial'
			animate='in'
			exit='out'
			variants={pageVariants}
			transition={pageTransition}
		>
			{children}
		</motion.div>
	)
}

export default PageTransition
