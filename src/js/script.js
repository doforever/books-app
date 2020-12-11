{
  'use strict';

  class BooksList {
    constructor () {
      this.favoriteBooks = []; // Stores ids of favorite books
      this.filters = []; // Stores chosen filters
      this.dom = {};
      this.getElements();
      this.renderBooks();
      this.initActions();
    }
    renderBooks(){
      const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
      for (let book of dataSource.books){
        const generatedHTML = bookTemplate(this.setCustomStyle(book));
        this.dom.booksList.appendChild(utils.createDOMFromHTML(generatedHTML));
      }
    }
    initActions(){
      /* 'dblclick' starts addToFavorite */
      this.dom.booksList.addEventListener('dblclick', (event) => {
        if (event.target.offsetParent.classList.contains('book__image')){
          this.addToFavorite(event.target.offsetParent);
        }
      });
      /* 'click' on checkbox updates filters and filter books */
      this.dom.filtersWrapper.addEventListener('click', (event) => {
        if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox'
        && event.target.name === 'filter'){
          if (event.target.checked){
            this.filters.push(event.target.value);
          } else if (this.filters.includes(event.target.value)){
            this.filters.splice(this.filters.indexOf(event.target.value),1);
          }
        }
        this.filter();
      });
    }
    getElements(){
      this.dom.filtersWrapper = document.querySelector('.filters');
      this.dom.booksList = document.querySelector('.books-list');
    }
    filter(){
      function checkFilter (filter, book) {
        if (filter && book.details[filter]) {
          return true;
        } else if (!filter && !book.details[filter]){
          return true;
        }
      }
      /* loop through all books dataSource.books */
      for (let book of dataSource.books){
        let hide = false;
        const bookDOM = this.dom.booksList.querySelector(`a[data-id="${book.id}"]`);
        /* loop through all filters */
        for (let filter of this.filters){
          if(!checkFilter(filter, book)) hide = true;
        }
        /* add or remove class hidden */
        if (hide){
          bookDOM.classList.add('hidden');
        } else {
          if (bookDOM.classList.contains('hidden')) bookDOM.classList.remove('hidden');
        }
      }
    }
    addToFavorite(target){
      if (!this.favoriteBooks.includes(target.dataset.id)) {
        this.favoriteBooks.push(target.dataset.id);
        target.classList.add('favorite');
      } else {
        this.favoriteBooks.splice(this.favoriteBooks.indexOf(target.dataset.id), 1);
        target.classList.remove('favorite');
      }
    }
    setCustomStyle(book) {
      if (book.rating < 6){
        book.customBackground = 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (book.rating > 6 && book.rating <= 8){
        book.customBackground = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (book.rating > 8 && book.rating <= 9) {
        book.customBackground = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else {
        book.customBackground = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      book.customWidth = book.rating*10 + '%';
      return book;
    }
  }

  new BooksList();
}
