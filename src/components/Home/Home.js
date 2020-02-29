import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import SearchBar from '../elements/SearchBar/SearchBar';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import LoadMoreButton from '../elements/LoadMoreButton/LoadMoreButton';
import LoadingCircle from '../elements/LoadingCircle/LoadingCircle';
import NoPoster from './no_poster.svg';

class Home extends Component {
  state = {
    movies: [],
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ''
  }  

  componentDidMount() {
    if(sessionStorage.getItem('HomeState')) {
      const state = JSON.parse(sessionStorage.getItem('HomeState'));
      this.setState({ ...state });
    } else {
      this.setState({
        loading: true
      });
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      this.fetchItems(endpoint);
    }    
  }

  searchItems = (searchTerm) => {
    let endpoint = '';
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    });

    if(searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }

    this.fetchItems(endpoint);
  }

  loadMoreItems = () => {
    const { searchTerm, currentPage } = this.state;
    let endpoint = '';
    this.setState({
      loading: true
    });

    if(searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
    }
    
    this.fetchItems(endpoint);
  }

  fetchItems = async endpoint => {
    const { movies, searchTerm } = this.state;
    const result = await (await fetch(endpoint)).json();
    try {
      this.setState({
        movies: [...movies, ...result.results],
        loading: false,
        currentPage: result.page,
        totalPages: result.total_pages
      }, () => {
        if(searchTerm === '') {
          sessionStorage.setItem('HomeState', JSON.stringify(this.state));
        }
      });
    } catch(error) {
      console.log('error: ', error);
    }
  }

  render() {
    const { movies, currentPage, totalPages, searchTerm, loading } = this.state;
    return(
      <>
      <Section className="search-section">
        <Container>
          <SearchBar callback={this.searchItems} />
        </Container>
      </Section>
      <Section>
        <Container>                   
          <ThumbnailGrid
            preHeader={searchTerm ? 'Search Result for' : null}
            header={searchTerm ? `"${searchTerm}"` : 'Trending Movies'}
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
      </>
    )
  }
}

export default Home;