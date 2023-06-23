/* eslint-disable import/no-cycle */
// Este es el punto de entrada de tu aplicacion

/* import { myFunction } from './lib/index.js';

//myFunction(); */
import { home } from './components/home.js';
import { register } from './components/register.js';
import { login } from './components/login.js';
import { feed } from './components/feed.js';

const rootDiv = document.getElementById('root');

const routes = {
  '/': home,
  '/register': register,
  '/login': login,
  '/feed': feed,
};

export const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[pathname](onNavigate));
};

window.onpopstate = () => {
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[window.location.pathname](onNavigate));
};

rootDiv.appendChild(routes[window.location.pathname](onNavigate));
