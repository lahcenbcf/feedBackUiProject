import React, { useMemo, useRef, useState } from 'react'
import './feedback.css'
import heartFull from "../../assets/heartFull.svg"
import {AiFillDelete,AiOutlineEdit} from "react-icons/ai"
import {IoMdSend} from "react-icons/io"
import heartEmpty from "../../assets/heartEmpty.svg"
import {BsArrowReturnRight} from "react-icons/bs"
import { addLike,addComment } from '../../api/feedbacks'
import {FaRegComments} from "react-icons/fa"
import format from 'date-fns/format'
import {AnimatePresence, motion} from "framer-motion"

function FeedBackItem({author,rate,date,feedback,likes,handleDelete,id,replys,getInputsToEdit,setEdit}){
  const [numlikes,setNumLikes]=useState(likes);
  const [isLiked,setIsLiked]=useState(false);
  const [rating,setRating]=useState(rate)
  const [showResponses,setShowResponses]=useState(false)
  const [isReponseShown,setIsReponseShown]=useState(false)
  const [responses,setResponses]=useState(replys)
  const commentRef=useRef()
  const handleLike=async(uid)=>{
        setIsLiked(!isLiked);
        setNumLikes(prev=>prev+1)
        await addLike(uid);
  }
  const handleComment=async()=>{
    if(!commentRef.current.value) return ;
    setResponses(prev=>[{comment:commentRef.current.value,date:format(new Date(),"yyyy-MM-dd")},...prev])

    setShowResponses(true)
    //save comment in databse
    await addComment({comment:commentRef.current.value,date:format(new Date(),"yyyy-MM-dd"),_id:id});
    commentRef.current.value=""
  }
  return (
    <div className='wrapper'>
    <div className='feedback'>
    <div className='feedbackReview' onClick={()=>setRating(prev=>+prev+1)}>{rating}</div>
    <button className='delete' onClick={handleDelete}><AiFillDelete /></button>
    <button className='edit' onClick={()=>{
      getInputsToEdit(feedback,author,id)
      setEdit(true)
    }}><AiOutlineEdit /></button>
      <div className='feedbackHeader'>
          <div className='user'>
              <div className='userInfo'>
                  <img src='https://randomuser.me/api/portraits/men/79.jpg' />
                  <p>{author}</p>
              </div>
              </div>
          <div className='date'>{date}</div>
      </div>
      <div className='feedbackContent'>
         <p>{feedback}</p>
      </div>
      <div className='feedbackFooter'>
          <div className='buttons'>
              <button className='respond' onClick={()=>setIsReponseShown(!isReponseShown)}>respond</button>
              <button className='share'>share</button>
          </div>
          <div className='comments'>
          <FaRegComments opacity={0.7} onClick={()=>setShowResponses(!showResponses)} />
          <p>{responses.length}</p>
          </div>
          
          <div className='likes'>
          <div onClick={()=>handleLike(id)}>
          <img src={isLiked ? heartFull : heartEmpty}  />
          <p>{numlikes}</p>
          </div>
          
          </div>
      </div>
      <AnimatePresence>
      {
        isReponseShown ?<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}> 
        <div className='respondInput'>
        <input type='text' placeholder='comment ...' ref={commentRef} />
        <IoMdSend className='sendBtn' color='#3793a0' onClick={handleComment}/>
    </div> 
        </motion.div>: null
      }
      </AnimatePresence>
      
      
    </div>
    <div className='responses'>
    {
          responses.length ?(
            showResponses &&
              <div>
              <BsArrowReturnRight size={20} color='#3793a0' />
             
                {responses.map(r=>(
                  <div className='responseContainer' key={r._id}>
                  <div className='user'>
                  <div className='userInfo'>
                      <img src='https://randomuser.me/api/portraits/men/17.jpg' />
                      <p>random user</p>
                  </div>
                  <div className='date'>{r.date}</div>
                  </div>
                  <div className='responseContent' >
                    {r.comment}
                  </div>
                  </div>
                ))
              }
              </div>
            
          
          )
          :<></>
        }
         
     
    </div>
    </div>
    
  )
}

export default FeedBackItem
