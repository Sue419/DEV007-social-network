/* eslint-disable max-len */
import { loginUsuarioYContraseña, loginGoogle } from '../lib/index.js';

export const login = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('container-login');

  // FORMULARIO LOGIN:::::::::::::::::::::::::::::::::::::::::::::::::::
  const buttonLogin = document.createElement('button');
  buttonLogin.classList.add('btn-inicia-sesion-login');
  buttonLogin.textContent = 'Iniciar Sesión';
  homeDiv.innerHTML += `
  <section class="container-btnHome">
  
  <button id="btnHome" class="btnHome">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-big-left-lines" width="44"
      height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round"
      stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 15v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h3v6h-3z" />
      <path d="M21 15v-6" />
      <path d="M18 15v-6" />
    </svg>
  </button>
</section>

<section class="containerFlex">
  <h2 class="inicia-texto">INICIA SESIÓN</h2>
  <img src="img/log_720.png" alt="logo" class="imgLogoLogin">
  <input class="input-email" id="email" type="email" placeholder="Email">
  <input class="input-password" id="password" type="password" placeholder="Password">
  <span class="ingresaCon-google">O ingresa con</span>
  <button class="btn-google" type="button"></button>

  <div id="snackbar" class="hide">
    <span id="snackbar-text"></span>
    <button id="snackbar-close">Close</button>
  </div>
</section>

  `;
  // BOTON HOME:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // const btnHome = document.getElementById('btnHome'); no funciona asi ya que ensta buscando en documen toca buscar en en el homeDiv
  // btnHome.addEventListener('click', () => onNavigate('/'));
  const btnHome = homeDiv.querySelector('#btnHome');// se tiene que menter en homeDiv para con el queryselector obtener el btnHome
  btnHome.addEventListener('click', () => onNavigate('/'));

  // Snackbar:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  function hideSnackbar() {
    const snackbar = document.getElementById('snackbar3');
    snackbar.classList.remove('show');
    snackbar.classList.add('hide');
  }
  const btnSnackbarClose = homeDiv.querySelector('#snackbar-close');
  btnSnackbarClose.addEventListener('click', () => {
    hideSnackbar();
  });

  function showSnackbar() {
    // const snackbar = document.getElementById('snackbar');
    // const snackbarText = document.getElementById('snackbar-text');

    // snackbar3Text.textContent = mensaje;
    // snackbar3.classList.remove('hide');
    // snackbar3.classList.add('show');

    setTimeout(hideSnackbar, 5000);
  }

  // LOGIN:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const inputEmail = homeDiv.querySelector('#email');
  const inputPassword = homeDiv.querySelector('#password');
  const btnLoginGoogle = homeDiv.querySelector('.btn-google');

  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputEmail.value === '' || inputPassword.value === '') {
      showSnackbar('Por favor, completa todos los campos');
      return;
    }
    loginUsuarioYContraseña(inputEmail.value, inputPassword.value).then(() => {
      onNavigate('/feed');
    })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          showSnackbar('El usuario no existe');
          return;
        }
        if (error.code === 'auth/wrong-password') {
          showSnackbar('Contraseña incorrecta');
        } else {
          showSnackbar('Ocurrió un error al iniciar sesión');
        }
      });
  });

  homeDiv.appendChild(buttonLogin);

  // LOGIN CON GOOGLE
  btnLoginGoogle.addEventListener('click', (e) => {
    e.preventDefault(); // como está dentro del formulario, es mejor colocar el preventDefault
    loginGoogle().then(() => {
      onNavigate('/feed');
    }); // informar al usuario que tiene que completar la selección de su gmail
  });

  // REDIRECCION REGISTRO::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const buttonRegister = document.createElement('button');
  buttonRegister.innerHTML = '¿No tienes una cuenta? <span class="btnQuestion">REGÍSTRATE</span>';
  homeDiv.appendChild(buttonRegister);
  buttonRegister.addEventListener('click', () => onNavigate('/register'));
  buttonRegister.classList.add('btn-register-direccion');

  return homeDiv;
};
