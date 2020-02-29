import React from 'react';
import { IMAGE_BASE_URL } from '../../../config';
import { Link } from 'react-router-dom';
import './Actor.scss';
import ActorMale from './john-doe.svg';
import ActorFemale from './jane-doe.svg';

const Actor = ({ actor }) => {
  const POSTER_SIZE = 'w342';

  return(
    <div className="actor-thumbnail-block">
      <Link to={{ pathname: `/actor/${actor.id}`, name: `${actor.name}` }}>
        <img
          src={actor.profile_path ?
            `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
            :
            (actor.gender === 1) ?
              ActorFemale
              :
              ActorMale
          }
          alt={actor.name}
          className="actor-thumbnail-image"
        />
      </Link>
      <div className="actor-thumbnail-description">
        <Link to={{ pathname: `/actor/${actor.id}`, name: `${actor.name}` }}>
          <div className="actor-thumbnail-name">{actor.name}</div>
        </Link>
        {actor.character? <div className="actor-thumbnail-character"><span className="muted">as </span>{actor.character}</div> : null}
      </div>      
    </div>
  )
}

export default Actor;