{
  'use strict';
  /* Global variables */
  const favoriteBooks = []; // Stores ids of favorite books
  const filters = []; // Stores chosen filters

  /* DOM references */
  const filtersWrapper = document.querySelector('.filters');
  const booksList = document.querySelector('.books-list');

  /* Listners */
  function initActions(){
    /* 'dblclick' starts addToFavorite */
    booksList.addEventListener('dblclick', function(event){
      if (event.target.offsetParent.classList.contains('book__image')){
        addToFavorite(event.target.offsetParent);
      }
    });
    /* 'click' on checkbox updates filters and filter books */
    filtersWrapper.addEventListener('click', function(event){
      if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox'
      && event.target.name === 'filter'){
        if (event.target.checked){
          filters.push(event.target.value);
        } else if (filters.includes(event.target.value)){
          filters.splice(filters.indexOf(event.target.value),1);
        }
      }
      filter();
    });
  }

  /* Functions */

  function renderBooks(){
    const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
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

  function filter(){
    console.log('filters', filters);
    const adultFilter = filters.includes('adults') ? 'adults' : '';
    const fictionFilter = filters.includes('nonFiction') ? 'nonFiction' : '';
    function checkFilter (filter, book) {
      if (filter && book.details[filter]) {
        return true;
      } else if (!filter && !book.details[filter]){
        return true;
      }
    }
    /* loop through all books dataSource.books */
    for (let book of dataSource.books){
      const bookDOM = booksList.querySelector(`a[data-id="${book.id}"]`);
      if (!checkFilter(adultFilter, book) || !checkFilter(fictionFilter, book)){
      /* add or remove class hidden */
        bookDOM.classList.add('hidden');
      } else {
        if (bookDOM.classList.contains('hidden')) bookDOM.classList.remove('hidden');
      }
    }
  }

  /* Run app */
  renderBooks();
  initActions();
}
