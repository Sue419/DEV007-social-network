import { crearPost, obtenerTodosLosPost, borrarPost, currentUserInfo } from '../lib';

//CONTENEDOR DE PUBLICACIONES:::::::::::::::::::::::::::::::::::::::::::::
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

//BOTON REGRESAR AL LOGIN::::::::::::::::::::::::::::::::::::::::::::::::
  const buttonLogin = document.createElement('button');
  buttonLogin.classList = 'home-div__button';
  buttonLogin.textContent = 'Regresar al Login';
  buttonLogin.addEventListener('click', () => onNavigate('/login'));

//BOTON PUBLICAR POST::::::::::::::::::::::::::::::::::::::::::::::::::::
  const buttonPost = homeDiv.querySelector('.new-post__container__button');

//PUBLICAR POST::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  buttonPost.addEventListener('click', async (e) => {
    e.preventDefault();
    const contenidoDelTextarea = homeDiv.querySelector('.new-post__container__textarea');
    console.log(contenidoDelTextarea.value);
    try {
      await crearPost(contenidoDelTextarea.value, currentUserInfo().uid);
      contenidoDelTextarea.value = '';
      console.log(currentUserInfo());
      alert('Publicación subida');
    } catch (error) {
      console.log(error.code);
    }
  });

//VER TODOS LOS POSTSSSS (ACUMULADOS):::::::::::::::::::::::::::::::::::::
  const postDivs = document.createElement('div');
  obtenerTodosLosPost((querySnapshot) => {
    postDivs.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const idPost = doc.id;
      console.log(idPost);
      console.log(currentUserInfo().uid);
      postDivs.innerHTML += `
        <div class="posts__post">
          <p>${doc.data().contenido}</p>
          <button id=${idPost} class="btn-borrar ">Borrar</button>
          <button id=${idPost} class="btn-editar ">Editar</button>

        </div>
      `;
    });
    borrar();//ESTO MUESTRA EL BOTON BORRAR CON LA FUNCION BORRAR OK::::::
    // editar();
  });

//FUNCION BORRAR POST:::::::::::::::::::::::::::::::::::::::::::::::::::::
  function borrar() {
    const botonesBorrar = postDivs.querySelectorAll('.btn-borrar');
    botonesBorrar.forEach((btnBorrar) => {
      btnBorrar.addEventListener('click', () => {
        borrarPost(btnBorrar.id);
      });
    });
  }
//FUNCION EDITAR POST::::::::::::::::::::::::::::::::::::::::::::::::::::
  // function editar() {
  //   const botonesEditar = postDivs.querySelector('.btn-editar');
  //   botonesEditar.forEach((btnEditar) => {
  //     btnEditar.addEventListener('click', () => {
  //       editarPost(btnEditar.id);
  //     });
  //   });
  // };

  homeDiv.querySelector('.posts__container').appendChild(postDivs);
  homeDiv.appendChild(buttonLogin);
  return homeDiv;
};


// EDITAR POST
// LIKES POST
// CONTAR LIKES POST
