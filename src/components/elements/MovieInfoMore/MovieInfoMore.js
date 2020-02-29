import React from 'react';
import { toUSD, formatDate, numberWithCommas } from '../../../helpers.js';
import './MovieInfoMore.scss';

const MovieInfoMore = ({ budget, countries, imdb_id, release_date, revenue, spoken_languages, studios, tmdb_id, vote_average, vote_count, website }) => {
  return(
    <div className="movie-more-info">
      {vote_average ?
        <>
          <h4 className="subject-heading">TMDB User Score</h4><p>{vote_average}/10<br/>based on {numberWithCommas(vote_count)} users</p>
        </>
        :
        null
      }
      {release_date ?
        <>
          <h4 className="subject-heading">Release Date</h4><p>{formatDate(release_date)}</p>
        </>
        :
        null
      }
      {budget ?
        <>
          <h4 className="subject-heading">Budget</h4><p>{toUSD(budget)}</p>
        </>
        :
        null
      }
      {revenue ?
        <>
          <h4 className="subject-heading">Revenue</h4><p>{toUSD(revenue)}</p>
        </>
        :
        null
      }
      {studios.length ?
        <>
          {studios.length > 1 ?
            <h4 className="subject-heading">Production Studios</h4>
            :
            <h4 className="subject-heading">Production Studio</h4>
          }
          {studios.map((element, iterator) => {
            return <span key={iterator}>{element.name}{iterator < studios.length - 1 ? <span className="info-seperator"></span> : null}</span>
          })}
        </>
        :
        null
      }
      {countries.length ?
        <>
          {countries.length > 1 ?
            <h4 className="subject-heading">Production Countries</h4>
            :
            <h4 className="subject-heading">Production Country</h4>
          }
          {countries.map((element, iterator) => {
            return <span key={iterator}>{element.name}{iterator < countries.length - 1 ? <span className="info-seperator"></span> : null}</span>
          })}
        </>
        :
        null
      }
      {spoken_languages.length ?
        <>
          {spoken_languages.length > 1 ?
            <h4 className="subject-heading">Spoken Languages</h4>
            :
            <h4 className="subject-heading">Spoken Language</h4>
          }
          {spoken_languages.map((element, iterator) => {
            return <span key={iterator}>{<><span className="is-uppercase">{element.iso_639_1} </span>{element.name}</>}{iterator < spoken_languages.length - 1 ? <span className="info-seperator"></span> : null}</span>
          })}
        </>
        :
        null
      }
      <h4 className="subject-heading">More Information</h4>
      {imdb_id ?
        <a className="external-link" href={`https://www.imdb.com/title/${imdb_id}/`} target="_blank" rel="noopener noreferrer">IMDB</a>
        :
        null
      }
      {tmdb_id ?
        <a className="external-link" href={`https://www.themoviedb.org/movie/${tmdb_id}/`} target="_blank" rel="noopener noreferrer">TMDB</a>
        :
        null
      }
      {website ?
        <a className="external-link" href={website} target="_blank" rel="noopener noreferrer">Offical Website</a>
        :
        null
      }
    </div>
  )
}
export default MovieInfoMore;