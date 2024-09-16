import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';

const TitleCards = ({title,category}) => {

  const cardsRef=useRef();
  const [apiData,setApiData]=useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTIzYWQ1NGU2OTdjOTlhYWFkZjczMWMwODM2OGMyMyIsIm5iZiI6MTcyNjQ5NjQ4MC4wODQwMDEsInN1YiI6IjY0MTliY2I5MzEwMzI1MDA3YzBiNTI4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PxwASIUbQvY0xExPprdH3d78RHzWKjerTesgbie7gv4'
    }
  };
  
  
    
  const handleWheel=(event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft +=event.deltaY;
  }
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err)); 

    cardsRef.current.addEventListener('wheel',handleWheel)
  },[])
  return (
    <div className='title_cards'>
      <h2>{title?title: "Popular on Netflix"}</h2>
      <div className="card_list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <div className="card" key={index}>
              <img src={`http://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=""  />
              <p>{card.original_title}</p>
          </div>
        })}
      </div>
    </div>
  );
}

export default TitleCards;
