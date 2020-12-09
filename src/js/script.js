{
  'use strict';

  function renderBooks(){
    const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    const booksList = document.querySelector('.books-list');
    for (let book of dataSource.books){
      const generatedHTML = bookTemplate(book);
      booksList.appendChild(utils.createDOMFromHTML(generatedHTML));
    }
  }

  renderBooks();
}
