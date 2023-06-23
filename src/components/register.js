import { crearUsuarioYContraseña } from '../lib/index.js';

// FORMULARIO REGISTRO DE USUARIO :::::::::::::::::::::::::::::::::::
export const register = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('fondo');
  const buttonRegister = document.createElement('button');
  buttonRegister.classList.add('btn-register-register');
  buttonRegister.textContent = 'Registrate';
  homeDiv.innerHTML += `
  <div class="form-container register-container">
    <div class="icono-flecha-home">
     <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-big-left-lines" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
     <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
     <path d="M12 15v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h3v6h-3z" />
     <path d="M21 15v-6" />
     <path d="M18 15v-6" />
     </svg>
    </div>
        <h2 class="register-texto">REGISTRO</h2>
        <img src="img/log_720.png" alt="logo" class="imgLogoRegister">
        <input  class="input-register-name" id="name" type="text" placeholder="Nombre">
        <input class="input-register-email" id="email" type="email" placeholder="Email">
        <input class="input-register-contraseña" id="password"  type="password" placeholder="password">
        <input class="input-register-contraseña-confirmar" id="passwordConfirm" type="password" placeholder="Confirm password">
    </div>
  `;
  /* ---------------------REGRESA AL HOME---------------------------------*/
  const buttonHome = document.createElement('button');
  buttonHome.textContent = '';
  buttonHome.addEventListener('click', () => onNavigate('/'));
  homeDiv.appendChild(buttonHome);
  buttonHome.classList.add('btn-flecha-home');
  /* ----------------------REGRESA AL LOGIN-------------------------------*/
  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = '¿Ya tienes cuenta? INICIA SESIÓN';
  homeDiv.appendChild(buttonLogin);
  buttonLogin.addEventListener('click', () => onNavigate('/login'));
  buttonLogin.classList.add('btn-login-direccion');

  // REGISTRO DE USUARIO::::::::::::::::::::::::::::::::::::::::::

  const inputEmail = homeDiv.querySelector('#email');
  const inputPassword = homeDiv.querySelector('#password');
  const inputPasswordConfirm = homeDiv.querySelector('#passwordConfirm');
  const inputName = homeDiv.querySelector('#name');

  buttonRegister.addEventListener('click', (e) => {
    if (inputName.value === '' || inputEmail.value === '' || inputPassword === '') {
      alert('Llena todos los campos');
      return;
    }
    if (inputName.value === '') {
      alert('ingrese su nombre');
      return;
    }
    if (inputEmail.value === '') {
      alert('ingrese un email');
      return;
    }
    if (inputPassword === '') {
      alert('ingresa una contraseña');
      return;
    }
    if (inputPassword !== inputPasswordConfirm) {
      alert('la contraseña con coincide');
      return;
    }
    e.preventDefault();
    crearUsuarioYContraseña(inputEmail.value, inputPassword.value, inputName.value);
    console.log(inputEmail.value, inputPassword.value, inputEmail.value);
  });
  homeDiv.appendChild(buttonRegister);

  return homeDiv;
};
