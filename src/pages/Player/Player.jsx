import React, { useEffect, useState } from "react";
import "./Player.css";
import play_icon from "../../assets/play_icon.png";
const Player = () => {

  const [apiData, setApiData]=useState({
    name:"",
    key:"",
    published_at:"",
    typeof:''
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTIzYWQ1NGU2OTdjOTlhYWFkZjczMWMwODM2OGMyMyIsIm5iZiI6MTcyNjQ5NjQ4MC4wODQwMDEsInN1YiI6IjY0MTliY2I5MzEwMzI1MDA3YzBiNTI4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PxwASIUbQvY0xExPprdH3d78RHzWKjerTesgbie7gv4'
    }
  };
  
  useEffect(()=>{

    fetch('https://api.themoviedb.org/3/movie/365177/videos?language=en-US', options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  },[])



  return (
    <div className="player">
      <img src={play_icon} alt="" />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  );
};

export default Player;
