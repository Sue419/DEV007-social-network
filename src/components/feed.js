import {
  crearPost, obtenerTodosLosPost, borrarPost, currentUserInfo, editarPost, obtenerUsuarioLogeado
} from '../lib/index.js';

// CONTENEDOR DE PUBLICACIONES:::::::::::::::::::::::::::::::::::::::::::::
export const feed = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('fondo-feed');
  homeDiv.classList.add('colorLetras');
  homeDiv.innerHTML += `
    <div class="form-container feed-container">
    <div class="barra-morada-feed">
      <h2 class="labgram-text-feed">LABGRAM </h2>
    </div>
    <div class="perfil-usuario">
      <img src="img/conejo.jpg" class="foto-perfil">
      <h2 class="usuario-post">¡Hola, ${obtenerUsuarioLogeado}!</h2></div>
        <h2 class="publicaciones-feed" ></h2>
        <div class="new-post__container ">
          <textarea class="new-post__container__textarea texto-publicacion" placeholder="Escribe algo aquí"></textarea>
          <button class="new-post__container__button btn-compartir">Compartir</button>
        </div>
        <section class="posts__container">
        </section>
    </div>
  `;

  // BOTON REGRESAR AL LOGIN::::::::::::::::::::::::::::::::::::::::::::::::
  const buttonLogin = document.createElement('button');
  buttonLogin.classList = 'home-div__button';
  buttonLogin.textContent = 'Regresar al Login';
  buttonLogin.addEventListener('click', () => onNavigate('/login'));

  // BOTON PUBLICAR POST::::::::::::::::::::::::::::::::::::::::::::::::::::
  const buttonPost = homeDiv.querySelector('.new-post__container__button');

  // PUBLICAR POST::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  buttonPost.addEventListener('click', async (e) => {
    e.preventDefault();
    const contenidoDelTextarea = homeDiv.querySelector('.new-post__container__textarea', '.firma');
    if (contenidoDelTextarea.value === '') {
      alert('completa todos los campos');
      return;
    }
    try {
      await crearPost(contenidoDelTextarea.value, currentUserInfo().uid);
      contenidoDelTextarea.value = '';
      console.log(currentUserInfo());
      console.log(obtenerUsuarioLogeado());//LO MUESTRA EN CONSOLA MAS NO EN EL POST
      alert('Publicación subida');
    } catch (error) {
      console.log(error.code);
    }
    console.log(contenidoDelTextarea.value);
  });

  // VER TODOS LOS POSTSSSS (ACUMULADOS):::::::::::::::::::::::::::::::::::::
  const postDivs = document.createElement('div');
  obtenerTodosLosPost((querySnapshot) => {
    postDivs.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const idUser = doc.data().usuario;
      const idPost = doc.id;
      console.log(idPost);
      console.log(currentUserInfo().uid);
      postDivs.innerHTML += `
        <div class="posts__post">
          <p>${doc.data().contenido}</p>
          <p>${obtenerUsuarioLogeado()}</p>
          <h3 class="usuario-post"></h3>
          <button id=${idPost} data-user=${idUser} class="btn-borrar ">Borrar</button> 
          <button id=${idPost} data-user=${idUser} class="btn-editar ">Editar</button>
        </div>
      `;
      editar(idPost, { contenido: 'Nuevo contenido' });
    });
    borrar();// ESTO MUESTRA EL BOTON BORRAR CON LA FUNCION BORRAR OK::::::
  });

  // FUNCION BORRAR POST:::::::::::::::::::::::::::::::::::::::::::::::::::::
  function borrar() {
    const botonesBorrar = postDivs.querySelectorAll('.btn-borrar');
    botonesBorrar.forEach((btnBorrar) => {
      btnBorrar.addEventListener('click', () => {
        const idPost = btnBorrar.id;
        const idPostUser = btnBorrar.dataset.user;
        if (currentUserInfo().uid === idPostUser) {
          borrarPost(idPost);
        } else {
          alert('No puedes eliminar, este post no es tuyo');
        }
        console.log(idPost);
        console.log(currentUserInfo().uid);
      });
    });
  }
  // FUNCION EDITAR POST::::::::::::::::::::::::::::::::::::::::::::::::::::
  function editar() {
    const botonesEditar = postDivs.querySelectorAll('.btn-editar');
    botonesEditar.forEach((btnEditar) => {
      btnEditar.addEventListener('click', () => {
        const idPostUser = btnEditar.dataset.user;
        const idPost = btnEditar.id;
        if (currentUserInfo().uid === idPostUser) {
          const editPost = prompt('Ingresa el nuevo contenido:');
          if (editPost !== null) {
            const updatePosts = { contenido: editPost };
            editarPost(idPost, updatePosts);
          }
        } else {
          alert('No puedes editar, este post no es tuyo');
        }
      });
    });
  }

  




  homeDiv.querySelector('.posts__container').appendChild(postDivs);
  homeDiv.appendChild(buttonLogin);
  return homeDiv;
};
