import React from 'react';
import { Link } from 'react-router-dom';
import ProgressCircle from '../ProgressCircle/ProgressCircle';
import './Thumbnail.scss';

const Thumbnail = ({ clickable, movieId, movieName, image, releaseDate, originalTitle, voteAverage }) => {
  return(
    <div className="movie-thumbnail-block">
      {clickable ?
        <Link to={{ pathname: `/movie/${movieId}`, movieName: `${movieName}` }}>
          <img src={image} alt={movieName} className="movie-thumbnail-image" />
        </Link>
        :
        <img src={image} alt={movieName} />
      }
      {movieName ?
        <div className="movie-thumbnail-description">
          <div className="movie-thumbnail-year">{releaseDate ? releaseDate.slice(0, 4) : null}</div>        
          {clickable ?
            <Link to={{ pathname: `/movie/${movieId}`, movieName: `${movieName}` }}>
              <h3>{movieName}</h3>            
            </Link>
            :
            <h3>{movieName}</h3>
          }
          {originalTitle === movieName ? null : <div className="movie-thumbnail-og-title"> Original Title: {originalTitle}</div>}
          {voteAverage ? <ProgressCircle radius="16" strokeWidth="2" strokeColor="#dc2d43" fillColor="#17141f" progress={voteAverage} /> : null}          
        </div>
        :
        null
      }                
    </div>      
  )
}

export default Thumbnail;