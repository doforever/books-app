{
  'use strict';
  /* Global variables */
  const favoriteBooks = []; // Stores ids of favorite books

  /* Listners */
  function initActions(){
    const covers = document.querySelectorAll('.book__image');
    for (let cover of covers){
      /* 'dblclick' starts addToFavorite */
      cover.addEventListener('dblclick', function(){
        addToFavorite(this);
      });
    }
  }

  /* Functions */

  function renderBooks(){
    const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    const booksList = document.querySelector('.books-list');
    for (let book of dataSource.books){
      const generatedHTML = bookTemplate(book);
      booksList.appendChild(utils.createDOMFromHTML(generatedHTML));
    }
  }

  function addToFavorite(target){
    /* add data-id to favoriteBooks */
    if (!favoriteBooks.includes(target.dataset.id)) favoriteBooks.push(target.dataset.id);
    /* add class favorite to .book__image */
    target.classList.add('favorite');
    console.log('favorites', favoriteBooks);

  }

  /* Run app */
  renderBooks();
  initActions();
}
