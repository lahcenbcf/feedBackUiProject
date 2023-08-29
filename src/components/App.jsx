import { useCallback, useEffect, useState } from 'react'
import './App.css'
import FeedbackList from './FeedbackList';
import { getFeedbacks } from '../api/feedbacks'
import FeedbackSearch from './feedbackSearch/FeedbackSearch';
import FeedBackForm from './feedBackForm/feedBackForm';
function App() {
  const [feedbacks,setFeedbacks]=useState([]);
  const [inputsToEdit,setInputsToEdit]=useState({
    author:"",
    feedback:"",
    feedbackId:""
  })
  const [isEdited,setIsEdited]=useState(false)
  const getInputsToEdit=(feedback,author,feedbackId)=>{
    setInputsToEdit({
      author,
      feedback,feedbackId
    })
  }
  const fetchFeedbacks=useCallback(async()=>{
    const data=await getFeedbacks()  
    return data
  },[])
  useEffect(()=>{
    fetchFeedbacks().then(setFeedbacks)
  },[])
  return (
   <div className='container'>
   <div className='AppTitle'>
   <h3>Feedback App</h3>
   </div>
   <FeedBackForm setList={setFeedbacks} inputsToEdit={inputsToEdit} isEdit={isEdited} setEdit={setIsEdited} />
   <FeedbackSearch total={feedbacks.length} setList={setFeedbacks} fetchFeeds={fetchFeedbacks} />
   <FeedbackList list={feedbacks} setList={setFeedbacks} getInputsToEdit={getInputsToEdit} setEdit={setIsEdited} />
   </div>
  )
}

export default App
