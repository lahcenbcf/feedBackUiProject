import React from 'react'
import FeedBackItem from './feedBackItem/FeedBackItem'
function FeedbackList({list,setList,getInputsToEdit,setEdit}) {
    const handleDelete=(id)=>{
        setList(list.filter(item=>item._id!=id))
    }
  return (
    <div>{
    list.map(f=>(
        <FeedBackItem handleDelete={()=>handleDelete(f._id)} key={f._id} author={f.author} feedback={f.feedback} date={f.date} rate={f.rate} likes={f.likes} id={f._id} replys={f.comments} getInputsToEdit={getInputsToEdit} setEdit={setEdit} />
       ))
     } </div>
  )
}

export default FeedbackList
