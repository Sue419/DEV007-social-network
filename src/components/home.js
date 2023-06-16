export const home = (onNavigate) => {
  // HTML
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('container');
  const viewHome = `
  <div>
<<<<<<< HEAD
    <h1 class="labgram-texto">LABGRAM</h1>
    <p class="p-texto">TU ESPACIO PARA COMPARTIR EJERCICOS DEL GYM</p>
    <img class="logo-labgram"src="img/log_720.png" alt="logo">
=======
  <h1>BIENVENID@S A</h1>
    <h2>{LABGRAM}</h2>
>>>>>>> 84eb943d787ea3719e0a0aeffca4c2d70a5de85e
  </div>
  
  `;
  homeDiv.innerHTML += viewHome;
  // BOTON INICIO

  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = 'Inicia sesión';
  homeDiv.appendChild(buttonLogin);
  buttonLogin.addEventListener('click', () => onNavigate('/login'));
  buttonLogin.classList.add('btn-iniciarSesion');

  // BOTON REGISTRARSE
  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'Registrate';
  homeDiv.appendChild(buttonRegister);
  buttonRegister.addEventListener('click', () => onNavigate('/register'));
  buttonRegister.classList.add('btn-register');
  return homeDiv;
};
