import { loginUsuarioYContraseña, loginGoogle } from '../lib/index.js';

export const login = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('fondo');

  // FORMULARIO LOGIN::::::::::::::::::::::::::::::::::::
  const buttonLogin = document.createElement('button');
  buttonLogin.classList.add('inicia-sesion-login');
  buttonLogin.textContent = 'Iniciar Sesión';
  homeDiv.innerHTML += `
  <div class="form-container login-container ">
    <div class="icono-flecha-home">
     <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-big-left-lines" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
     <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
     <path d="M12 15v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h3v6h-3z" />
     <path d="M21 15v-6" />
     <path d="M18 15v-6" />
      </svg>
    </div>
    <h2 class="inicia-texto">INICIA SESIÓN</h2>
    <img src="img/log_720.png" alt="logo" class="imgLogoLogin">
       <input class="input-email" id="email" type="email" placeholder="Email">
       <input class="input-password" id="password" type="password" placeholder="Password">
       <a class="olvidoContraseña">¿OLVIDASTE TU CONTRASEÑA?</a>
       <span class="ingresaCon-google">O ingresa con</span>
      <br>
   <div class="fondo-icono-google"></div>
      <button class="btn-google" type="button">
       </button>
   </div>
  `;

  // LOGIN::::::::::::::::::::::::::::::::::::::::::::::::::
  const inputEmail = homeDiv.querySelector('#email');
  const inputPassword = homeDiv.querySelector('#password');
  const btnLoginGoogle = homeDiv.querySelector('.btn-google');

  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputEmail.value === '' || inputPassword.value === '') {
      alert('Por favor, completa todos los campos');
      return;
    }
    loginUsuarioYContraseña(inputEmail.value, inputPassword.value)
      .then(() => {
        onNavigate('/feed');
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          alert('El usuario no existe');
        }
        if (error.code === 'auth/wrong-password') {
          alert('Contraseña incorrecta');
        } else {
          alert('Ocurrió un error al iniciar sesión');
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
  /* ----------------- redireccion registro---------------------------*/
  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = '¿No tienes una cuenta? Registrate';
  homeDiv.appendChild(buttonRegister);
  buttonRegister.addEventListener('click', () => onNavigate('/register'));
  buttonRegister.classList.add('btn-register-direccion');

  /* -----------------REGRESA AL HOME---------------------------*/

  const buttonHome = document.createElement('button');
  buttonHome.textContent = '';
  buttonHome.addEventListener('click', () => onNavigate('/'));
  homeDiv.appendChild(buttonHome);
  buttonHome.classList.add('btn-flecha-home');

  return homeDiv;
};
