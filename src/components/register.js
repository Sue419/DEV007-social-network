/** @format */

import { crearUsuarioYContraseña } from '../lib/index.js';

// FORMULARIO REGISTRO DE USUARIO ::::::::::::::::::::::::::::::::::::::
export const register = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('container-register');
  const buttonRegister = document.createElement('button');
  buttonRegister.classList.add('btn-register-register');
  buttonRegister.textContent = 'Registrate';
  homeDiv.innerHTML += `
  <button class="btnRegister" id="btnRegister">
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
<div class="form-container register-container">
  <h2 class="register-texto">REGISTRO</h2>
  <img src="img/log_720.png" alt="logo" class="imgLogoRegister">
  <input class="input-register-name" id="name" type="text" placeholder="Nombre">
  <input class="input-register-email" id="email" type="email" placeholder="Email">
  <input class="input-register-contraseña" id="password" type="password" placeholder="password">
  <input class="input-register-contraseña-confirmar" id="passwordConfirm" type="password"
    placeholder="Confirm password">
</div>
<div id="snackbar" class="hide">
  <span id="snackbar-text"></span>
  <button id="snackbar-close">Close</button>
</div>
<div id="modal" class="modalRegister">
  <div class="modal-content">
    <h2>Registro Exitoso</h2>
    <div class="logo-register-exitoso"></div>
    <button class="modalClose"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="60" height="60" viewBox="0 0 24 24" stroke-width="3" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M5 12l5 5l10 -10" />
  </svg></button>
  </div>
</div>

    `;
  // BOTON HOME:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // eslint-disable-next-line max-len
  // const btnHome = document.getElementById('btnHome'); no funciona asi ya que ensta buscando en documen toca buscar en en el homeDiv
  // btnHome.addEventListener('click', () => onNavigate('/'));
  const btnRegister = homeDiv.querySelector('#btnRegister'); // se tiene que menter en homeDiv para con el queryselector obtener el btnHome
  btnRegister.addEventListener('click', () => onNavigate('/'));

  // Snackbar:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  function hideSnackbar() {
    const snackbar = document.getElementById('snackbar');
    snackbar.classList.remove('show');
    snackbar.classList.add('hide');
  }
  const btnSnackbarClose = homeDiv.querySelector('#snackbar-close');
  btnSnackbarClose.addEventListener('click', () => {
    hideSnackbar();
  });

  function showSnackbar(mensaje) {
    const snackbar = document.getElementById('snackbar');
    const snackbarText = document.getElementById('snackbar-text');

    snackbarText.textContent = mensaje;
    snackbar.classList.remove('hide');
    snackbar.classList.add('show');

    setTimeout(hideSnackbar, 8000);
  }
  // MODAL::::::::::::::::::::::::::::::::::::::::::
  const modalRegister = homeDiv.querySelector('.modalRegister');
  const closeBtn = homeDiv.querySelector('.modalClose');
  function openModal() {
    modalRegister.style.display = 'flex';
  }
  function closeModal() {
    modalRegister.style.display = 'none';
    onNavigate('/feed');
  }

  // REGISTRO DE USUARIO:::::::::::::::::::::::::::::::::::::::::::::::
  const inputEmail = homeDiv.querySelector('#email');
  const inputPassword = homeDiv.querySelector('#password');
  const inputPasswordConfirm = homeDiv.querySelector('#passwordConfirm');
  const inputName = homeDiv.querySelector('#name');

  buttonRegister.addEventListener('click', (e) => {
    // console.log(inputEmail.value, inputPassword.value, inputName.value);
    if (inputName.value === '') {
      showSnackbar('Ingrese su nombre');
      return;
    }
    if (inputEmail.value === '') {
      showSnackbar('Ingrese un email');
      return;
    }
    if (inputPassword.value === '') {
      showSnackbar('Ingresa una contraseña');
      return;
    }
    if (inputPasswordConfirm.value === '') {
      showSnackbar('Ingresa la confirmacion de la contraseña');
      return;
    }
    if (inputPassword.value !== inputPasswordConfirm.value) {
      showSnackbar('La contraseña no coincide');
      return;
    }
    e.preventDefault();
    crearUsuarioYContraseña(
      inputEmail.value,
      inputPassword.value,
      inputName.value,
    )
      .then(() => {
        if (inputEmail) {
          openModal();
        }
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          showSnackbar('Usuario Registrado');
        }
      });
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
      if (event.target === modalRegister) {
        closeModal();
      }
    });
  });
  homeDiv.appendChild(buttonRegister);
  // REGRESA AL LOGIN:::::::::::::::::::::::::::::::::::::::::::::::::::
  const buttonLogin = document.createElement('button');
  buttonLogin.innerHTML = '¿Ya tienes cuenta? INICIA SESIÓN';
  homeDiv.appendChild(buttonLogin);
  buttonLogin.addEventListener('click', () => onNavigate('/login'));
  buttonLogin.classList.add('btn-login-direccion');

  return homeDiv;
};
