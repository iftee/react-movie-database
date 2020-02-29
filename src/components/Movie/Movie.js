import React, { Component } from 'react';
import { API_URL, API_KEY } from '../../config';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoMore from '../elements/MovieInfoMore/MovieInfoMore';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Actor from '../elements/Actor/Actor';
import LoadingCircle from '../elements/LoadingCircle/LoadingCircle';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import './Movie.scss';

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    writers: [],
    videos: [],
    loading: false
  }

  componentDidMount() {
    const { movieId } = this.props.match.params;
    this.setState({
      loading: true
    });
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    this.fetchItems(endpoint);
  }

  fetchItems = async endpoint => {
    const { movieId } = this.props.match.params;
    try {
      const result = await (await fetch(endpoint)).json();
      if (result.status_code) {
        this.setState({ loading: false });
      } else {
        this.setState({ movie: result });
        const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        const videosEndpoint = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}`;
        const creditsResult = await (await fetch(creditsEndpoint)).json();
        const directors = creditsResult.crew.filter(
          (member) => member.job === 'Director'
        );
        const writers = creditsResult.crew.filter(
          (member) => member.job === 'Screenplay'
        );
        this.setState({
          actors: creditsResult.cast,
          directors,
          writers,
          loading: false
        });
        const videosResult = await (await fetch(videosEndpoint)).json();
        this.setState({
          videos: videosResult.results,
          loading: false
        });
      }
    } catch(error) {
      console.log('error: ', error);
    }
  }

  render() {
    const { actors, directors, loading, movie, videos, writers } = this.state;
    return(
      <>
        {movie && videos ?
          <>
            <MovieInfo movie={movie} directors={directors} writers={writers} videos={videos} />
            <Section>
              <Container>
                <Columns centered={true}>
                  <Columns.Column widescreen={{ size: 10 }} fullhd={{ size: 9 }}>
                    <Columns>
                      <Columns.Column tablet={{ size: 9 }} className="actor-grid-wrap">
                        {actors ?
                          <ThumbnailGrid header="Movie Cast">                          
                            {actors.map((element, iterator) => {
                              return <Actor key={iterator} actor={element} />
                            })}
                          </ThumbnailGrid>          
                          :
                          <p>No cast has been provided for this movie.</p>
                        }
                      </Columns.Column>
                      <Columns.Column tablet={{ size: 3 }} >
                        <MovieInfoMore
                          release_date={movie.release_date}
                          vote_average={movie.vote_average}
                          vote_count={movie.vote_count}
                          budget={movie.budget}
                          revenue={movie.revenue}
                          studios={movie.production_companies}
                          countries={movie.production_countries}
                          spoken_languages={movie.spoken_languages}
                          imdb_id={movie.imdb_id}
                          tmdb_id={movie.id}
                          website={movie.homepage}
                        />
                      </Columns.Column>
                    </Columns>
                  </Columns.Column>            
                </Columns>
              </Container>
            </Section>                    
          </>
          :
          null
        }
        {!actors && !loading ?
          <Section className="has-text-centered movie-not-found">
            <Container>
              <h1 className="glitch">Could not find this movie</h1>
              <p>Go back to <a href="/">Home page</a></p>
            </Container>       
          </Section>
          :
          null
        }
        {loading ? <LoadingCircle /> : null}
      </>
    )
  }
}

export default Movie;