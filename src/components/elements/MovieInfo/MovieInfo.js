import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../../config';
import { Link } from 'react-router-dom';
import Thumbnail from '../Thumbnail/Thumbnail';
import ProgressCircle from '../ProgressCircle/ProgressCircle';
import { toHourMinute } from '../../../helpers.js';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Content from 'react-bulma-components/lib/components/content';
import Modal from 'react-bulma-components/lib/components/modal';
import { FiPlayCircle, FiPlay, FiXCircle, FiX } from 'react-icons/fi';
import * as Vibrant from 'node-vibrant';
import NoPoster from './no_poster.svg';
import NoBackdrop from './no_backdrop.png';
import './MovieInfo.scss';

const MovieInfo = ({ directors, movie, movieName, videos, writers }) => {
  var backDropImageLink = movie.backdrop_path ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}` : NoBackdrop;  
  const backdropLoaded = () => {
    var vibrant = new Vibrant(backDropImageLink);
    vibrant.getPalette((err, palette) => {
      var backdropOverlayColor = 'rgba(' + (palette['DarkVibrant']['rgb']).toString() + ',.9);';
      document.querySelector('.movie-page-header-overlay').setAttribute('style', 'background-color:' + backdropOverlayColor + ';');
    });        
  }
  
  var videoArray = [];
  var embedLink = '';
  var buttonPlayTrailer;
  if(videos.length > 0) {
    var i;
    for(i = 0; i < videos.length; i++) {
      if(videos[i].type === 'Trailer') {
        videoArray.push(videos[i].key);
      }
    }
    if(videoArray.length > 0) {
      embedLink = 'https://www.youtube.com/embed/' + videoArray[0] + '?&autoplay=1';
      buttonPlayTrailer = document.querySelector('#buttonPlayTrailer');
      buttonPlayTrailer.setAttribute('data-link', embedLink);
      buttonPlayTrailer.setAttribute('style', 'opacity: 1;');
    }
  }
  const playTrailer = () => {
    var embedLink = document.querySelector('#buttonPlayTrailer').getAttribute('data-link');    
    document.querySelector('#videoIframe').setAttribute('src', embedLink);
    document.querySelector('#videoModal').classList.add('is-active');
  }
  const closeModal = () => {
    document.querySelector('#videoModal').classList.remove('is-active');
    document.querySelector('#videoIframe').setAttribute('src', '');
  }

  return(
    <div className="movie-page-header">
      <img src={backDropImageLink} className="movie-page-header-backdrop" onLoad={backdropLoaded} alt={movie.title} />
      <div className="movie-page-header-overlay">
      </div>
      <Section>
        <Container>
          <Columns centered={true}>
            <Columns.Column widescreen={{ size: 10 }} fullhd={{ size: 9 }}>
              <Columns>
                <Columns.Column tablet={{ size: 4 }} >
                  <Thumbnail
                    clickable={false}
                    image={movie.poster_path ?
                      `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                      :
                      NoPoster
                    }
                    alt={movieName}
                  />
                </Columns.Column>
                <Columns.Column tablet={{ size: 8 }} >
                  <Content>
                    <h1>{movie.title}</h1>
                    {movie.title === movie.original_title ? null : <p> Original Title: {movie.original_title}</p>}
                    <p className="movie-quick-info">
                      {movie.release_date ?
                        <span className="movie-quick-info-span">
                          <Link to={{ pathname: `/year/${movie.release_date.slice(0, 4)}` }} className="additional-link">{movie.release_date.slice(0, 4)}</Link>
                        </span>
                        :
                        null
                      }
                      {movie.genres.length ?
                        <span className="movie-quick-info-span">
                          {movie.genres.map((element, iterator) => {
                            return <Link to={{ pathname: `/genre/${element.id}` }} key={iterator} className="additional-link">{element.name}</Link>
                          })}
                        </span>
                        :
                        null
                      }  
                      {movie.runtime ?
                        <span className="movie-quick-info-span">{toHourMinute(movie.runtime)}</span>
                        :
                        null
                      }                      
                    </p>
                    {movie.vote_average ?
                      <ProgressCircle radius="25" strokeWidth="2" strokeColor="#dc2d43" fillColor="#17141f" progress={movie.vote_average} />
                      :
                      null
                    }                    
                    {videos ?
                      <>
                        <button className="button" data-link="" id="buttonPlayTrailer" onClick={playTrailer}>
                          <FiPlayCircle />
                          <FiPlay />
                          Play Trailer
                        </button>
                        <div className="modal" id="videoModal">
                          <div className="modal-background"></div>
                          <Modal.Content>
                            <div className="video-container">
                              <iframe title={movie.title} id="videoIframe" width="640" height="360" src="" frameBorder="0" allowFullScreen></iframe>                         
                            </div>
                            <button className="button modal-close is-large" aria-label="close" id="videoModalClose" onClick={closeModal}>
                              <FiXCircle />
                              <FiX />
                            </button>                          
                          </Modal.Content>                        
                        </div>
                      </>
                      :
                      null
                    }
                    <h3 className="subject-heading">Storyline</h3>
                    {movie.tagline ? <p>"{movie.tagline}"</p> : null }
                    <p>{movie.overview}</p>
                    {directors.length ?
                      <>
                        {directors.length > 1 ?
                          <h3 className="subject-heading">Directors</h3>
                          :
                          <h3 className="subject-heading">Director</h3>
                        }
                        {directors.map((element, iterator) => {
                          return <Link to={{ pathname: `/director/${element.id}` }} key={iterator} className="additional-link">{element.name}</Link>
                        })}
                      </>
                      :
                      null
                    }
                    {writers.length ?
                      <>
                        {writers.length > 1 ?
                          <h3 className="subject-heading">Writers</h3>
                          :
                          <h3 className="subject-heading">Writer</h3>
                        }
                        {writers.map((element, iterator) => {
                          return <Link to={{ pathname: `/writer/${element.id}` }} key={iterator} className="additional-link">{element.name}</Link>
                        })}
                      </>
                      :
                      null
                    }                                        
                  </Content>                    
                </Columns.Column>
              </Columns>
            </Columns.Column>
          </Columns>            
        </Container>
      </Section>
    </div>
  )
}

export default MovieInfo;