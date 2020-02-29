import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import LoadMoreButton from '../elements/LoadMoreButton/LoadMoreButton';
import LoadingCircle from '../elements/LoadingCircle/LoadingCircle';
import NoPoster from './no_poster.svg';
import './BrowseByGenre.scss';

class BrowseByGenre extends Component {
  state = {
    movies: [],
    loading: false,
    currentPage: 0,
    totalPages: 0,
    parameterString: ''
  }  

  componentDidMount() {
    const { genreId } = this.props.match.params;
    this.setState({
      loading: true
    });
    const endpointParameter = `${API_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
    this.fetchParameter(endpointParameter, genreId);
    const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=1`;
    this.fetchItems(endpoint);
  }

  loadMoreItems = () => {
    const { currentPage } = this.state;
    const { genreId } = this.props.match.params;
    let endpoint = '';
    this.setState({
      loading: true
    });
    endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=${currentPage + 1}`;    
    this.fetchItems(endpoint);
  }

  fetchParameter = async (endpointParameter, genreId) => {
    try {
      const resultParameter = await (await fetch(endpointParameter)).json();
      const parameterArray = resultParameter.genres.filter(
        (member) => member.id === parseInt(genreId)
      );
      if(parameterArray.length) {
        this.setState({
          parameterString: parameterArray[0].name
        });
      }
    } catch(error) {
      console.log('error: ', error);
    }
  }

  fetchItems = async endpoint => {
    const { movies } = this.state;
    try {
      const result = await (await fetch(endpoint)).json();
      this.setState({
        movies: [...movies, ...result.results],
        loading: false,
        currentPage: result.page,
        totalPages: result.total_pages
      });
    } catch(error) {
      console.log('error: ', error);
    }
  }

  render() {
    const { movies, currentPage, loading, totalPages, parameterString } = this.state;
    return(
      <>
        {movies ?
          <Section className="browse-by-genre-page">
            <Container>                   
              <ThumbnailGrid
                preHeader={'Popular Movies In'}
                header={parameterString}
                loading={loading}
              >
                {movies.map((element, i) => {
                  return <Thumbnail
                    key={i}
                    clickable={true}
                    image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : NoPoster}
                    movieId={element.id}
                    movieName={element.title}
                    originalTitle={element.original_title}
                    releaseDate={element.release_date}
                    voteAverage={element.vote_average}
                    />
                })}
              </ThumbnailGrid>
              {loading ? <LoadingCircle /> : null}
              {(currentPage < totalPages && !loading) ?
                <LoadMoreButton
                  text="Load More Movies"
                  onClick={this.loadMoreItems}
                />
                : null
              }         
            </Container>
          </Section>
          :
          <>
            {!loading ?
              <Section className="has-text-centered genre-not-found">
                <Container>
                  <h1 className="glitch">Could not find this genre</h1>
                  <p>Go back to <a href="/">Home page</a></p>
                </Container>       
              </Section>
              :
              null
            }
          </>          
        }
      </>
    )
  }
}

export default BrowseByGenre;