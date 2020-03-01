import React from 'react';
import { NavLink } from "react-router-dom";
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
          <NavLink to="/" className="navbar-item">
            <div className="navbar-brand-text">RMDB<span className="is-hidden-mobile"><br/>Discover movies with React JS</span></div>
          </NavLink>
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
                  <NavLink to="/genre/28" className="navbar-item">Action</NavLink>
                  <NavLink to="/genre/12" className="navbar-item">Adventure</NavLink>
                  <NavLink to="/genre/16" className="navbar-item">Animation</NavLink>
                  <NavLink to="/genre/35" className="navbar-item">Comedy</NavLink>
                  <NavLink to="/genre/80" className="navbar-item">Crime</NavLink>
                  <NavLink to="/genre/99" className="navbar-item">Documentary</NavLink>
                  <NavLink to="/genre/18" className="navbar-item">Drama</NavLink>
                  <NavLink to="/genre/10751" className="navbar-item">Family</NavLink>
                  <NavLink to="/genre/14" className="navbar-item">Fantasy</NavLink>
                  <NavLink to="/genre/36" className="navbar-item">History</NavLink>
                  <NavLink to="/genre/27" className="navbar-item">Horror</NavLink>
                  <NavLink to="/genre/10402" className="navbar-item">Music</NavLink>
                  <NavLink to="/genre/9648" className="navbar-item">Mystery</NavLink>
                  <NavLink to="/genre/10749" className="navbar-item">Romance</NavLink>
                  <NavLink to="/genre/878" className="navbar-item">Science Fiction</NavLink>
                  <NavLink to="/genre/10770" className="navbar-item">TV Movie</NavLink>
                  <NavLink to="/genre/53" className="navbar-item">Thriller</NavLink>
                  <NavLink to="/genre/10752" className="navbar-item">War</NavLink>
                  <NavLink to="/genre/37" className="navbar-item">Western</NavLink>
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
                    return <NavLink key={key} to={`/year/${value}`} className="navbar-item">{value}</NavLink>
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