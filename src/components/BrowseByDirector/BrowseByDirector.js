import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import { compareValues } from '../../helpers';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import LoadingCircle from '../elements/LoadingCircle/LoadingCircle';
import PersonHeader from '../elements/PersonHeader/PersonHeader';
import NoPoster from './no_poster.svg';
import './BrowseByDirector.scss';


class BrowseByDirector extends Component {
  state = {
    movies: [],
    loading: false
  }
  
  componentDidMount() {
    const { directorId } = this.props.match.params;
    this.setState({
      loading: true
    });
    const endpoint = `${API_URL}person/${directorId}/movie_credits?api_key=${API_KEY}&language=en-US`;
    const personEndpoint = `${API_URL}person/${directorId}?api_key=${API_KEY}&language=en-US`;
    this.fetchPerson(personEndpoint);    
    this.fetchItems(endpoint);
  }

  fetchPerson = async personEndpoint => {
    const { directorId } = this.props.match.params;
    try {
      const resultPerson = await (await fetch(personEndpoint)).json();
      this.setState({
        name: resultPerson.name,
        birthday: resultPerson.birthday,
        deathday: resultPerson.deathday,
        biography: resultPerson.biography,
        place_of_birth: resultPerson.place_of_birth,
        gender: resultPerson.gender,
        profile_path: resultPerson.profile_path,
        imdb_id: resultPerson.imdb_id,
        tmdb_id: directorId,
        homepage: resultPerson.homepage
      });
    } catch(error) {
      console.error('error: ', error);
    }
  }

  fetchItems = async endpoint => {
    try {
      const result = await (await fetch(endpoint)).json();
      const directedMovies = result.crew.filter(
        (member) => member.job === 'Director'
      );
      const directedMoviesSorted = directedMovies.sort(compareValues('release_date', 'desc'));
      this.setState({
        movies: directedMoviesSorted,
        loading: false
      });
    } catch(error) {
      console.error('error: ', error);
    }
  }

  render() {
    const { biography, birthday, deathday, gender, homepage, imdb_id, loading, movies, name, place_of_birth, profile_path, tmdb_id } = this.state;
    return(
      <>
        {name ?       
          <Section className="browse-by-director">
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
                    preHeader='Movies Directed By'
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

export default BrowseByDirector;