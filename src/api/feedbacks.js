const url="https://feedbackuiapi.onrender.com"
const getFeedbacks=async()=>{
    const res=await fetch(url);
    const data=await res.json();
    return data
}

const addLike=async(id)=>{
    const res=await fetch(url,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            _id:id
        })
    })
    return res
}
const addFeedback=async(feedback)=>{
    const res=await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(feedback)
    });
    return res
}
const addComment=async (objectData)=>{
    const res=await fetch(`${url}/addComment`,{
        headers:{
            "Content-Type":"application/json"
        },
        method:"PATCH",
        body:JSON.stringify(objectData)
    })
    return res
}
const updateFeedback=async(dataToUpdate)=>{
    const res=await fetch(`${url}/updateFeed`,{
        headers:{
            "Content-Type":"application/json"
        },
        method:"PATCH",
        body:JSON.stringify(dataToUpdate)
    })
    return res
}
export  {getFeedbacks,addFeedback,addLike,addComment,updateFeedback};