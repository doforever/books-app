{
  'use strict';
  /* Global variables */
  const favoriteBooks = []; // Stores ids of favorite books

  /* Listners */
  function initActions(){
    /* 'dblclick' starts addToFavorite */
    const booksList = document.querySelector('.books-list');
    booksList.addEventListener('dblclick', function(event){
      if (event.target.offsetParent.classList.contains('book__image')){
        addToFavorite(event.target.offsetParent);
      }
    });
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
    if (!favoriteBooks.includes(target.dataset.id)) {
      favoriteBooks.push(target.dataset.id);
      target.classList.add('favorite');
    } else {
      favoriteBooks.splice(favoriteBooks.indexOf(target.dataset.id), 1);
      target.classList.remove('favorite');
    }
  }

  /* Run app */
  renderBooks();
  initActions();
}
