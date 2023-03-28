import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const API_Key = process.env.REACT_APP_GIPHY_API_KEY;
const Tag = () => {
  const [gif, setGif] = useState("");
  const [loading, setLoading] = useState(false);
  const[tag,setTag]=useState('');

  async function fetchData() {
    setLoading(true);
    const url = `https://api.giphy.com/v1/gifs/random?api_key=kC0kZcGTTNZITKMQPLaxGwHeGpwYMn4S&tag=${tag}`;
    const { data } = await axios.get(url);
    console.log(data);
    const imageSource = data.data.images.downsized_large.url;
    setGif(imageSource);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function clickHandler() {
    console.log("mango");
    fetchData();
  }

  const changeHandler=(e)=>{
    setTag(e.target.value);
  }

  return (
    <div className="w-1/2  bg-yellow-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px]">
      <h1 className="text-3xl underline uppercase font-bold">Random {tag} Gif</h1>
      {loading ? <Spinner /> : <img src={gif} alt="gif" width="450" />}
      <input
        type="text"
        className="w-10/12 text-lg py-2 rounded-lg mb-[6px]"
        onChange={changeHandler}
        value={tag}
      />
      <button
        type="button"
        className="w-10/12 bg-white text-lg py-2 rounded-lg mb-[10px]"
        onClick={clickHandler}
      >
        Generate
      </button>
    </div>
  );
};

export default Tag;
