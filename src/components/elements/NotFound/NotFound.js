import React from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import './NotFound.scss';

const NotFound = () => {
  return(
    <Section className="has-text-centered not-found">
      <Container>
        <h1 className="glitch">404</h1>
        <p>This page doesn't exist.</p>
        <p>Go back to <a href="/">Home page</a></p>
      </Container>       
    </Section>    
  )
}

export default NotFound;