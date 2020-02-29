import React from 'react';
import Footer from 'react-bulma-components/lib/components/footer';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import PoweredByTMDB from './PoweredByRectangle_Green.svg';

const AppFooter = () => {
  return(
    <Footer>
      <Container>
        <Columns>
          <Columns.Column>
            <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
              <img src={PoweredByTMDB} alt="Powered by The Movie DB" />
            </a>
            <p>A React based project to discover movies using TMDB API.</p>
            <p>View repository on <a href="https://github.com/iftee/react-movie-database" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
          </Columns.Column>
        </Columns>
      </Container>
    </Footer>
  )
}

export default AppFooter;