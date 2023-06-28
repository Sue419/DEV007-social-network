import {
  crearPost, obtenerTodosLosPost, borrarPost, currentUserInfo, editarPost, likesPost, removeLike,
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
        <h2 class="publicaciones-feed" >Publicaciones</h2>
        <div class="new-post__container ">
          <textarea class="new-post__container__textarea texto-publicacion" placeholder="Escribe aqui"></textarea>
          <button class="new-post__container__button btn-compartir">Publicar</button>
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
    const contenidoDelTextarea = homeDiv.querySelector('.new-post__container__textarea');
    if (contenidoDelTextarea.value === '') {
      alert('completa todos los campos');
      return;
    }
    try {
      await crearPost(contenidoDelTextarea.value, currentUserInfo().uid);
      contenidoDelTextarea.value = '';
      console.log(currentUserInfo());
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
          <button id=${idPost} data-user=${idUser} class="btn-borrar ">Borrar</button> 
          <button id=${idPost} data-user=${idUser} class="btn-editar ">Editar</button>
          <button id=${idPost} class="btn-like">Like</button>
          <span class="likes-count" data-post=${idPost}></span>
        </div>
      `;
      
      editar(idPost, { contenido: '' });
    });
    borrar();// ESTO MUESTRA EL BOTON BORRAR CON LA FUNCION BORRAR OK::::::
    darLike(querySnapshot);
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
        const idPost = btnEditar.id;
        const idPostUser = btnEditar.dataset.user;
        if (currentUserInfo().uid === idPostUser) {
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
        const idUser = currentUserInfo().uid;
        try {
          const postSnapshot = querySnapshot.docs.find((doc) => doc.id === idPost);
          const post = postSnapshot.data();
          if (post.likes && post.likes.includes(idUser)) {
            // El usuario puede remover el like
            await removeLike(idPost, idUser);
            console.log('Se removio el like');
          } else {
            // Agregar el like
            await likesPost(idPost, idUser);
            console.log('Like agregado');
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
  }

  homeDiv.querySelector('.posts__container').appendChild(postDivs);
  homeDiv.appendChild(buttonLogin);
  return homeDiv;
};

// EDITAR POST
// LIKES POST
// CONTAR LIKES POST
