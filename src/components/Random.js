import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from './Spinner';

const API_Key_Data = process.env.REACT_APP_NOT_SECRET_CODE
console.log(API_Key_Data)
const Random = () => {
    const[gif,setGif]=useState('');
    const[loading,setLoading]=useState(false);
    
    async function fetchData(){
      setLoading(true)
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_Key_Data}`;
      const {data}=await axios.get(url);
      console.log(data);
      const imageSource=data.data.images.downsized_large.url;
      setGif(imageSource)
      setLoading(false);
    }

    useEffect(()=>{
      fetchData();
    },[])

    async function clickHandler(){
      console.log("mango");
      fetchData();
    }
    
  return (
    <div className='w-1/2  bg-violet-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px]'>
      <h1 className='text-3xl underline uppercase font-bold'>A Random Gif</h1>
      {loading?<Spinner/>:<img src={gif} alt="gif" width="450"/>}
      <button type='button' className='w-10/12 bg-white text-lg py-2 rounded-lg mb-[10px]' onClick={clickHandler}>Generate</button>
    </div>
  )
}

export default Random