export const home = (onNavigate) => {
  // HTML
  const homeDiv = document.createElement("div");
  homeDiv.classList.add("container");
  const viewHome = `
<<<<<<< HEAD
  <div class="textCenter containerHome">
  <h1 class="bienvenida" >BIENVENID@S a</h1>
    <h2>{LABGRAM}</h2>
    <img src="img/logo.png" alt="logo" class="imgLogo">
    <button id=">Inicia sesión</button>
=======
  <div>
  <h1>BIENVENID@S A</h1>
    <h2>{LABGRAM}</h2>
>>>>>>> a78fbc7d3f17b3f0ebfc55fe68e61574b53bb893
  </div>
  
  `;
  homeDiv.innerHTML += viewHome;
  // BOTON INICIO

  const buttonLogin = document.createElement("button");
  buttonLogin.textContent = "Inicia sesión";
  homeDiv.appendChild(buttonLogin);
  buttonLogin.addEventListener("click", () => onNavigate("/login"));
  buttonLogin.classList.add("btnLogin");

  // BOTON REGISTRARSE
  const buttonRegister = document.createElement("button");
  buttonRegister.textContent = "Registrate";
  homeDiv.appendChild(buttonRegister);
  buttonRegister.addEventListener("click", () => onNavigate("/register"));

  return homeDiv;
};
