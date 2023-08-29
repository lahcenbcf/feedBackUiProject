import React, { useRef, useState } from 'react'
import './feedbackForm.css'
import {format } from 'date-fns'
import {TbArrowWaveRightUp} from "react-icons/tb"
import { addFeedback,updateFeedback } from '../../api/feedbacks';

function FeedBackForm({setList,inputsToEdit,isEdit,setEdit}) {
    const feedBackRef=useRef();
    const nameRef=useRef();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if( !feedBackRef.current.value || !nameRef.current.value ) return
        const newFeed={
            feedback:feedBackRef.current.value,
            rate:"0",
            author:nameRef.current.value,
            date:format(new Date(), 'yyyy-MM-dd'),
            comments:new Array()
        }
        if(isEdit){
          setList(prevList=> prevList.map(item=>{
            if(item._id===inputsToEdit.feedbackId){
              item.feedback=feedBackRef.current.value
              item.author=nameRef.current.value
            }
            return item
          }))
          //update on the server
          try {
            await updateFeedback({
              id:inputsToEdit.feedbackId,
              newAuthor:nameRef.current.value,
              newFeed:feedBackRef.current.value
            })
        } catch (error) {
            console.log(error)
        }
        setEdit(false)
        }else{
          setList(prev=>[newFeed,...prev])
           //add on the server
           try {
            const res=await addFeedback(newFeed)
        } catch (error) {
            console.log(error)
        }
 }
 
    }
  return (
    <div className='card'>
      <form onSubmit={handleSubmit}>
        <h3>How do you rate our app ?</h3>
        <div className='inputsGroup'>
            <TbArrowWaveRightUp size={40} color='#3793a0' className='arrow' />
            <input type='text' placeholder='Full name' ref={nameRef} defaultValue={inputsToEdit.author} />
            <input type='text' placeholder='feedback' ref={feedBackRef} className="feedback" defaultValue={inputsToEdit.feedback} />
            <button type='submit'>send</button>
        </div>
      </form>
    </div>
  )
}

export default FeedBackForm
