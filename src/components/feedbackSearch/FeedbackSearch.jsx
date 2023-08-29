import React, { useEffect, useRef, useState } from 'react'
import "./feedbackSearch.css"
import searchSvg from "../../assets/searchSvg.svg"
function FeedbackSearch({total=0,setList,fetchFeeds}) {
  const selectedValue=useRef()
  const [query,setQuery]=useState("")
  const handleChange = (event) => {
    switch (selectedValue.current.value) {
      case "most rated":
        setList(prev=>prev.sort((a, b)=>{
          return +b.rate - (+a.rate);
        }))
      case "most liked":
        setList(prev=>prev.sort((a, b)=>{
          return b.likes - (a.likes);
        }))
      default:
        break;
    }
  };
  let initialState;
  useEffect( ()=>{
      const timeout=setTimeout(()=>{
        fetchFeeds().then(data=>{
          initialState=data
        query && setList(initialState.filter(item=>item.feedback.includes(query)))
     },1000)
    })
    
    return ()=>{
      clearTimeout(timeout)
    }
  },[query])
  return (
    <div className='searchContainer'>
        <div className='total'>{total} Total</div>
        <select value={selectedValue} ref={selectedValue} onChange={handleChange} className='select'>
        
        <option value="latest">Latest</option>

        <option value="most rated">most rated</option>

        <option value="most liked">most liked</option>

      </select>
      <div className='search-input'>
      <img src={searchSvg} />
      <input type='text' placeholder='search' onChange={(e)=>setQuery(e.target.value)}/>
      </div>
    </div>
  )
}

export default FeedbackSearch
