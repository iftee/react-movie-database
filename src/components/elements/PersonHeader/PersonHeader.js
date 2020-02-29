import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../config';
import { formatDate } from '../../../helpers';
import PersonMale from './john-doe.svg';
import PersonFemale from './jane-doe.svg';
import './PersonHeader.scss';

const PersonHeader = ({ name, profile_path, gender, biography, birthday, place_of_birth, deathday, imdb_id, tmdb_id, homepage }) => {
  return(
    <div className="person-info-wrap">
      <div className="person-image-wrap">
        <img
          src={profile_path ?
            `${IMAGE_BASE_URL}${POSTER_SIZE}${profile_path}`
            :
            (gender === 1) ?
              PersonFemale
              :
              PersonMale
          }
          alt={name}
          className="person-image"
        />
      </div>
      <div className="person-info">        
        {biography ?
          <>
            <h4 className="subject-heading">Biography</h4>
            <p>{biography}</p>
          </>
          :
          null
        }      
        {birthday ?
          <>
            <h4 className="subject-heading">Born</h4>
            <p>
              {formatDate(birthday)}
              {place_of_birth ?
                <span> in {place_of_birth}</span>
                :
                null
              }
            </p>
          </>
          :
          null
        }
        {deathday ?
          <>
            <h4 className="subject-heading">Died</h4>
            <p>{formatDate(deathday)}</p>
          </>
          :
          null
        }
        <h4 className="subject-heading">More Information</h4>
        {imdb_id ?
          <a className="external-link" href={`https://www.imdb.com/name/${imdb_id}/`} target="_blank" rel="noopener noreferrer">IMDB</a>
          :
          null
        }
        {tmdb_id ?
          <a className="external-link" href={`https://www.themoviedb.org/person/${tmdb_id}/`} target="_blank" rel="noopener noreferrer">TMDB</a>
          :
          null
        }
        {homepage ?          
          <a className="external-link" href={homepage} target="_blank" rel="noopener noreferrer">Offical Website</a>
          :
          null
        }
      </div>
    </div>
  )
}

export default PersonHeader;