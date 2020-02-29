import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.scss';

ReactDOM.render(<App />, document.getElementById('root'));

// Bulma Navbar Toggle and Dropdown Toggle
document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  const $dropdownMenus = Array.prototype.slice.call(document.querySelectorAll('.has-dropdown'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach( element => {
      element.addEventListener('click', () => {
        const target = element.dataset.target;
        const $target = document.getElementById(target);
        element.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
  if ($dropdownMenus.length > 0) {
    $dropdownMenus.forEach( element => {
      element.addEventListener('click', (event) => {
        if(event.currentTarget.classList.contains('is-active')){
          event.currentTarget.classList.remove('is-active');
        }
        else {
          var active = document.querySelector('.has-dropdown.is-active');
          if(active) {
            active.classList.remove('is-active');
          }
          event.currentTarget.classList.toggle('is-active');
        }
      });
    });
  }
});