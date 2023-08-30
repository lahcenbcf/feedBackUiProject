import React from 'react'
import {motion,AnimatePresence} from "framer-motion"
import FeedBackItem from './feedBackItem/FeedBackItem'
function FeedbackList({list,setList,getInputsToEdit,setEdit}) {
    const handleDelete=(id)=>{
        setList(list.filter(item=>item._id!=id))
    }
  return (
    <div>
    <AnimatePresence>
    {
      list.map(f=>(
        <motion.div key={f._id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <FeedBackItem handleDelete={()=>handleDelete(f._id)} key={f._id} author={f.author} feedback={f.feedback} date={f.date} rate={f.rate} likes={f.likes} id={f._id} replys={f.comments} getInputsToEdit={getInputsToEdit} setEdit={setEdit} />
        </motion.div>
         ))
       }
    </AnimatePresence>
    </div>
  )
}

export default FeedbackList
