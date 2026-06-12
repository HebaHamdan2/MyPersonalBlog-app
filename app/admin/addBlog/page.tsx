"use client"
import axios from 'axios';
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Page = () => {
  const [image,setImage]=useState(null);
  const [data,setData]=useState({
    title:"",
    description:"",
    category:"Startup",
    author:"Heba Hamdan",
    authorImage:"/profile_icon.png"
  });
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}));
  }
  const onSubmitHandler=async(e)=>{
  e.preventDefault();
  const formData=new FormData();
  formData.append('title',data.title);
  formData.append('description',data.description);
  formData.append('category',data.category);
  formData.append('author',data.author);
  formData.append('authorImage',data.authorImage);
  formData.append('image',image);
  const response=await axios.post('/api/blogs',formData);
  if(response.data.success){
    toast.success(response.data.msg);
    setImage(null);
    setData({
      title:"",
      description:"",
      category:"Startup",
      author:"Heba Hamdan",
      authorImage:"/profile_icon.png"
    })
  }else{
    toast.error("Error");
  }
  }
  return (
   <>
   <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
    <p className='text-xl'>Upload thumbnail</p>
    <label htmlFor="image">
        <Image   className='mt-4 cursor-pointer w-auto h-auto' src={image==null?'/upload-area.png':URL.createObjectURL(image)}  alt="upload" width={200} height={120} />
    </label>
    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
 <p className='text-xl mt-4 '>Blog Title</p>
 <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required />
 <p className='text-xl mt-4 '>Blog Description</p>
 <textarea  name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border'  placeholder='Write Content here' required />
<p className='text-xl mt-4'>Blog Category </p>
<select  name="category"  onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500' >
  <option value="Startup">Startup</option>
  <option value="Technology">Technology</option>
  <option value="Lifestyle">Lifestyle</option>
</select>
<br />
<button type='submit' className='mt-8 h-12 w-40 bg-black text-white'>ADD</button>
   </form>
   </>
  )
}

export default Page