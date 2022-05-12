import { motion } from 'framer-motion'
import React from 'react'
import { slideUpVariants } from '../../helpers/animation'
import Loader from '../ui/Loader'

import AddComment from './AddComment'
import Comment from './Comment'

const CommentList = ({ comments, movie_id, loading, error }) => {
  return (
    <motion.div variants={slideUpVariants}>
      <h3 className="mb-8 text-white font-poppins underline text-xl">
        Comments
      </h3>
      <AddComment movie_id={movie_id} />
      {loading && <Loader loading={loading} />}
      {error && (
        <span className="text-red-500">Error while loading comments</span>
      )}
      {comments?.length > 0 &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
    </motion.div>
  )
}

export default CommentList
