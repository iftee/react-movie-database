import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import LoadMoreButton from '../elements/LoadMoreButton/LoadMoreButton';
import LoadingCircle from '../elements/LoadingCircle/LoadingCircle';
import PersonHeader from '../elements/PersonHeader/PersonHeader';
import NoPoster from './no_poster.svg';
import './BrowseByActor.scss';


class BrowseByActor extends Component {  
  state = {
    movies: [],
    loading: false,
    currentPage: 0,
    totalPages: 0
  }  

  componentDidMount() {
    const { actorId } = this.props.match.params;
    this.setState({
      loading: true
    });
    const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&with_cast=${actorId}&language=en-US&&sort_by=release_date.desc&page=1`;
    const personEndpoint = `${API_URL}person/${actorId}?api_key=${API_KEY}&language=en-US`;
    this.fetchItems(endpoint);
    this.fetchActor(personEndpoint);
  }

  fetchActor = async personEndpoint => {
    try {
      const personResult = await (await fetch(personEndpoint)).json();
      const { actorId } = this.props.match.params;
      this.setState({
        name: personResult.name,
        birthday: personResult.birthday,
        deathday: personResult.deathday,
        biography: personResult.biography,
        place_of_birth: personResult.place_of_birth,
        gender: personResult.gender,
        profile_path: personResult.profile_path,
        imdb_id: personResult.imdb_id,
        tmdb_id: actorId,
        homepage: personResult.homepage
      })
    } catch(error) {
      console.log('error: ', error);
    }
  }

  fetchItems = async endpoint => {
    try {
      const { movies } = this.state;
      const result = await (await fetch(endpoint)).json();
      this.setState({
        movies: [...movies, ...result.results],
        loading: false,
        currentPage: result.page,
        totalPages: result.total_pages
      })
    } catch(error) {
      console.log('error: ', error);
    }
  }

  loadMoreItems = () => {
    const { actorId } = this.props.match.params;
    const { currentPage } = this.state;
    const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&with_cast=${actorId}&language=en-US&sort_by=release_date.desc&page=${currentPage + 1}`;
    this.setState({
      loading: true
    });
    this.fetchItems(endpoint);
  }

  render() {
    const { biography, birthday, currentPage, deathday, gender, homepage, imdb_id, loading, movies, name, place_of_birth, profile_path, tmdb_id, totalPages } = this.state;
    return(
      <>
        {name ?       
          <Section className="browse-by-actor">
            <Container>          
              <Columns>
                <Columns.Column tablet={{ size: 4 }} desktop={{ size: 3 }}>
                  <PersonHeader
                    name={name}
                    birthday={birthday}
                    deathday={deathday}
                    biography={biography}
                    place_of_birth={place_of_birth}
                    gender={gender}
                    profile_path={profile_path}
                    imdb_id={imdb_id}
                    tmdb_id={tmdb_id}
                    homepage={homepage}
                  />
                </Columns.Column>
                <Columns.Column tablet={{ size: 8 }} desktop={{ size: 9 }}>
                  <ThumbnailGrid
                    preHeader='Movies Starring'
                    header={name}
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
                </Columns.Column>
              </Columns>                                         
            </Container>
          </Section>
          :
          null
        }
        {!loading && !movies ?
          <Section className="has-text-centered person-not-found">
            <Container>
              <h1 className="glitch">Could not find this person</h1>
              <p>Go back to <a href="/">Home page</a></p>
            </Container>       
          </Section>
          :
          null
        }
      </>
    )
  }
}

export default BrowseByActor;