import { motion } from 'framer-motion'
import React from 'react'
import { slideUpVariants } from '../../helpers/animation'

import AddComment from './AddComment'
import Comment from './Comment'

const CommentList = ({ comments, movie_id }) => {
  return (
    <motion.div variants={slideUpVariants}>
      <h3 className="mb-8 text-white font-poppins underline text-xl">
        Comments
      </h3>
      <AddComment movie_id={movie_id} />
      {comments?.length > 0 &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
    </motion.div>
  )
}

export default CommentList
