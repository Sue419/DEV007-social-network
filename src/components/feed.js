import {
  crearPost,
  obtenerTodosLosPost,
  borrarPost,
  currentUserInfo,
  editarPost,
  likesPost,
  removeLike,
  usuarioLogeado,
  logOut,
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
      <h1 class="usuario-saludo">¡Hola!<br>${usuarioLogeado()}</h1>
      <h2 class="bienvenida-feed">Bienvenida a tu espacio para compartir ejercicios del GYM</h2>
      <br><br>
    </div>
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

  // BOTON CERRAR SESION
  const buttonOut = document.createElement('button');
  buttonOut.classList = 'home-div__button';
  buttonOut.textContent = 'Cerrar Sesión';
  buttonOut.addEventListener('click', () => {
    logOut().then(() => onNavigate('/'));
  });

  // BOTON PUBLICAR POST::::::::::::::::::::::::::::::::::::::::::::::::::::
  const buttonPost = homeDiv.querySelector('.new-post__container__button');

  const postDivs = document.createElement('div');

  // PUBLICAR POST::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  buttonPost.addEventListener('click', async (e) => {
    e.preventDefault();
    const contenidoDelTextarea = homeDiv.querySelector('.new-post__container__textarea', '.firma');
    if (contenidoDelTextarea.value === '') {
      alert('completa todos los campos');
      return;
    }
    try {
      await crearPost(contenidoDelTextarea.value, currentUserInfo().email);
      contenidoDelTextarea.value = '';
      // console.log(currentUserInfo());
      // console.log(usuarioLogeado());//LO MUESTRA EN CONSOLA MAS NO EN EL POST
      alert('Publicación subida');
    } catch (error) {
      // console.log(error.code);
    }
    // console.log(contenidoDelTextarea.value);
  });

  // FUNCION BORRAR POST:::::::::::::::::::::::::::::::::::::::::::::::::::::
  function borrar() {
    const botonesBorrar = postDivs.querySelectorAll('.btn-borrar');
    botonesBorrar.forEach((btnBorrar) => {
      btnBorrar.addEventListener('click', () => {
        const idPost = btnBorrar.id;
        const idPostUser = btnBorrar.dataset.user;
        if (currentUserInfo().email === idPostUser) {
          borrarPost(idPost);
        } else {
          alert('No puedes eliminar, este post no es tuyo');
        }
        // console.log(idPost);
        // console.log(currentUserInfo().email);
      });
    });
  }
  // FUNCION EDITAR POST::::::::::::::::::::::::::::::::::::::::::::::::::::
  function editar() {
    const botonesEditar = postDivs.querySelectorAll('.btn-editar');
    botonesEditar.forEach((btnEditar) => {
      btnEditar.addEventListener('click', () => {
        const idPost = btnEditar.id;
        const idPostUser = btnEditar.dataset.user;
        if (currentUserInfo().email === idPostUser) {
          const editPost = prompt('Edita el post:');
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

  // FUNCION DAR LIKE A LOS POSTS :::::::::::::::::::::::::::::::::::::::
  function darLike(querySnapshot) {
    const botonesLikes = postDivs.querySelectorAll('.btn-like');
    botonesLikes.forEach((btnLikes) => {
      btnLikes.addEventListener('click', async () => {
        const idPost = btnLikes.id;
        const idUser = currentUserInfo().email;
        try {
          const postSnapshot = querySnapshot.docs.find((doc) => doc.id === idPost);
          const post = postSnapshot.data();
          if (post.likes && post.likes.includes(idUser)) {
            // El usuario puede remover el like
            await removeLike(idPost, idUser);
            // console.log('Se removio el like');
          } else {
            // Agregar el like
            await likesPost(idPost, idUser);
            // console.log('Like agregado');
          }
        } catch (error) {
          // console.log(error);
        }
      });
    });
  }

  // VER TODOS LOS POSTSSSS (ACUMULADOS):::::::::::::::::::::::::::::::::::::
  obtenerTodosLosPost((querySnapshot) => {
    postDivs.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const idUser = doc.data().usuario;
      const idPost = doc.id;
      const fecha = doc.data().date.toDate().toLocaleString();
      // console.log(idPost);
      // console.log(currentUserInfo().email);
      // console.log(usuarioLogeado());
      postDivs.innerHTML += `
        <div class="posts__post">
          <p>${doc.data().contenido}</p>
          <p>${doc.data().usuario}</p>
          <p>${fecha}</p>
          <h3 class="usuario-post"></h3>
          <button id=${idPost} data-user=${idUser} class="btn-borrar ">Borrar</button> 
          <button id=${idPost} data-user=${idUser} class="btn-editar ">Editar</button>
          <button id=${idPost} class="btn-like">Like</button>
          <span class="likes-count" data-post=${idPost}>${doc.data().likes.length}</span>
        </div>
      `;
      editar(idPost, { contenido: '' });
    });
    borrar();// ESTO MUESTRA EL BOTON BORRAR CON LA FUNCION BORRAR OK::::::
    darLike(querySnapshot);
  });

  homeDiv.querySelector('.posts__container').appendChild(postDivs);
  homeDiv.appendChild(buttonLogin);
  homeDiv.appendChild(buttonOut);
  return homeDiv;
};
