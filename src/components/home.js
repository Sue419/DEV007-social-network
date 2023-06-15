export const home = (onNavigate) => {
  // HTML
  const homeDiv = document.createElement("div");
  const viewHome = `
  <div>
  <h1>BIENVENID@S A</h1>
    <h2>{LABGRAM}</h2>
  </div>
  
  `;
  homeDiv.innerHTML += viewHome;
  // BOTON INICIO
  const buttonLogin = document.createElement("button");

  buttonLogin.textContent = "Inicia sesión";

  homeDiv.appendChild(buttonLogin);

  buttonLogin.addEventListener("click", () => onNavigate("/login"));
  // BOTON REGISTRARSE
  const buttonRegister = document.createElement("button");
  buttonRegister.textContent = "Registrate";
  homeDiv.appendChild(buttonRegister);
  buttonRegister.addEventListener("click", () => onNavigate("/register"));

  return homeDiv;
};
