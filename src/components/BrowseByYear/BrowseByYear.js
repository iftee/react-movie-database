import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import LoadMoreButton from '../elements/LoadMoreButton/LoadMoreButton';
import LoadingCircle from '../elements/LoadingCircle/LoadingCircle';
import NoPoster from './no_poster.svg';
import './BrowseByYear.scss';

class BrowseByYear extends Component {
  state = {
    movies: [],
    loading: false,
    currentPage: 0,
    totalPages: 0,
    parameterString: 0
  }  

  componentDidMount() {
    const { yearId } = this.props.match.params;
    this.setState({
      loading: true,
      parameterString: yearId
    });
    const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&primary_release_year=${yearId}&page=1`;
    this.fetchItems(endpoint);
  }

  loadMoreItems = () => {
    const { yearId } = this.props.match.params;
    const { currentPage } = this.state;
    let endpoint = '';
    this.setState({
      loading: true
    });
    endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&primary_release_year=${yearId}&page=${currentPage + 1}`;    
    this.fetchItems(endpoint);
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
    const { movies, currentPage, totalPages, loading, parameterString } = this.state;
    return(
      <>
        {movies.length ?
          <Section className="browse-by-year-page">
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
            <Section className="has-text-centered year-not-found">
              <Container>
                <h1 className="glitch">No movie found for this year</h1>
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

export default BrowseByYear;