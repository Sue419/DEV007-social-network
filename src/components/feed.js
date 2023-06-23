import { crearPost, obtenerTodosLosPost, borrarPost } from '../lib';

// CONTENEDOR DE PUBLICACIONES:::::::::::::::::::::::::
export const feed = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('fondo-feed');
  homeDiv.classList.add('colorLetras');
  homeDiv.innerHTML += `
    <div class="form-container feed-container">
    <div class="barra-morada-feed">
      <h2 class="labgram-text-feed">LABGRAM </h2>
    </div>
        <h2 class="publicaciones-feed" >Publicaciones</h2>
        <div class="new-post__container ">
          <textarea class="new-post__container__textarea texto-publicacion" placeholder="Escribe aqui"></textarea>
          <button class="new-post__container__button btn-compartir">Publicar</button>
        </div>
        <section class="posts__container">
        </section>
    </div>
  `;
  // BOTON REGRESAR AL LOGIN:::::::::::::::::::::::::::::::::
  const buttonLogin = document.createElement('button');
  buttonLogin.classList = 'home-div__button';
  buttonLogin.textContent = 'Regresar al Login';
  buttonLogin.addEventListener('click', () => onNavigate('/login'));

  // PUBLICACION DE POST:::::::::::::::::::::::::::::::::::
  const buttonPost = homeDiv.querySelector('.new-post__container__button');

  buttonPost.addEventListener('click', async (e) => {
    e.preventDefault();
    const contenidoDelTextarea = homeDiv.querySelector('.new-post__container__textarea');
    if (contenidoDelTextarea.value === '') {
      alert('completa todos los campos');
      return;
    }
    try {
      await crearPost(contenidoDelTextarea.value);
      contenidoDelTextarea.value = '';
      alert('Publicación subida');
    } catch (error) {
      console.log(error.code);
    }
    console.log(contenidoDelTextarea.value);
  });

  // TODOS LOS POSTSSSS (ACUMULADOS):::::::::::::::::::::::::::::::::::::
  const postDivs = document.createElement('div');
  obtenerTodosLosPost((querySnapshot) => {
    postDivs.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const idPost = doc.id;
      // console.log(idPost);
      postDivs.innerHTML += `
        <div class="posts__post">
          <p>${doc.data().contenido}</p>
          <button id=${idPost} class="btn-borrar ">borrar</button>
        </div>
      `;
    });
    borrar();
  });
  /* -------------------------FUNCION BORRAR POST------------------------------*/
  function borrar() {
    const botonesBorrar = postDivs.querySelectorAll('.btn-borrar');
    botonesBorrar.forEach((btnBorrar) => {
      btnBorrar.addEventListener('click', () => {
        borrarPost(btnBorrar.id);
      });
    });
  }

  homeDiv.querySelector('.posts__container').appendChild(postDivs);
  homeDiv.appendChild(buttonLogin);
  return homeDiv;
};

// BORRAR POST
// EDITAR POST
// LIKES POST
// CONTAR LIKES POST
