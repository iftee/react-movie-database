import React from 'react';
import Navbar from 'react-bulma-components/lib/components/navbar';
import Container from 'react-bulma-components/lib/components/container';
import { last20Years } from '../../../helpers';
import { IoIosArrowDropdown, IoIosArrowDown } from 'react-icons/io';
import './Header.scss';

const Header = () => {
  const yearValues = last20Years();
  return(
    <Navbar fixed="top" color="black">
      <Container>
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="/">
            <div className="navbar-brand-text">RMDB<span className="is-hidden-mobile"><br/>Discover movies with React JS</span></div> 
          </Navbar.Item>
          <Navbar.Burger data-target="navMenu" />
        </Navbar.Brand>
        <Navbar.Menu id="navMenu">
          <Navbar.Container position="end">
            <Navbar.Item dropdown className="is-mega">
              <Navbar.Link className="is-arrowless">
                Browse by Genre
                <IoIosArrowDropdown />
                <IoIosArrowDown />                
              </Navbar.Link>
              <Navbar.Dropdown>
                <Container className="nav-inline-wrap">
                  <Navbar.Item href="/genre/28">Action</Navbar.Item>
                  <Navbar.Item href="/genre/12">Adventure</Navbar.Item>
                  <Navbar.Item href="/genre/16">Animation</Navbar.Item>
                  <Navbar.Item href="/genre/35">Comedy</Navbar.Item>
                  <Navbar.Item href="/genre/80">Crime</Navbar.Item>
                  <Navbar.Item href="/genre/99">Documentary</Navbar.Item>
                  <Navbar.Item href="/genre/18">Drama</Navbar.Item>
                  <Navbar.Item href="/genre/10751">Family</Navbar.Item>
                  <Navbar.Item href="/genre/14">Fantasy</Navbar.Item>
                  <Navbar.Item href="/genre/36">History</Navbar.Item>
                  <Navbar.Item href="/genre/27">Horror</Navbar.Item>
                  <Navbar.Item href="/genre/10402">Music</Navbar.Item>
                  <Navbar.Item href="/genre/9648">Mystery</Navbar.Item>
                  <Navbar.Item href="/genre/10749">Romance</Navbar.Item>
                  <Navbar.Item href="/genre/878">Science Fiction</Navbar.Item>
                  <Navbar.Item href="/genre/10770">TV Movie</Navbar.Item>
                  <Navbar.Item href="/genre/53">Thriller</Navbar.Item>
                  <Navbar.Item href="/genre/10752">War</Navbar.Item>
                  <Navbar.Item href="/genre/37">Western</Navbar.Item>
                </Container>                
              </Navbar.Dropdown>
            </Navbar.Item>
            <Navbar.Item dropdown className="is-mega">
              <Navbar.Link className="is-arrowless">
                Browse by Year
                <IoIosArrowDropdown />
                <IoIosArrowDown /> 
              </Navbar.Link>
              <Navbar.Dropdown>
                <Container className="nav-inline-wrap" id="nav-year-wrap">
                  {yearValues.map((value, key) => {
                    return <Navbar.Item key={key} href={`/year/${value}`}>{value}</Navbar.Item>
                  })}
                </Container>                
              </Navbar.Dropdown>
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Container>      
    </Navbar>
  )
}

export default Header;