import React, { useEffect, useRef, useState } from 'react'
import './Titlecard.css'
import cards_data from '../../assets/cards/Cards_data'
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Titlecard({title,category}) {

  const [apiData,setApiData]=useState([]);
  const cardsRef =useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTg5MDA3MTkzYzY0M2MzZjU1ZGI3MDE0NDY4ZTNiYyIsIm5iZiI6MTc1MTEyNjU4Mi42OTYsInN1YiI6IjY4NjAxMjM2ODYzMzdhODAwYjBkOGU4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6eAmg787EFbiqtwmKsa3GzHFp90SYRJFJB8NRhg9cMg'
  }
};

    useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
    },[])

  const handleWheel=(e)=>{
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  }
  
  useEffect(()=>{
    cardsRef.current.addEventListener('wheel',handleWheel);
  },[])

  return (
    <div className='title-cards'>
      <h2>{title}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) =>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt={card.name} />
            <p>{card.original_title}</p>
          </Link>
        }
        )}
      </div>
    </div>
  )
}

export default Titlecard
