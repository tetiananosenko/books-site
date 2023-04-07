/* eslint-disable */

class BooksList {
  constructor() {
    this.showBooks(dataSource.books);
    this.initActions();

  }
  showBooks(books) {
    const BookId = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    for (let book in books) {
      const rating = books[book].rating;
      const styleHtml = {
        ratingBgc: this.determinRatingBgc(rating),
        ratingWidth: Number(rating) * 10
      };
      let generatedHTML = BookId({
        ...books[book],
        ...styleHtml
      });
      let element = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector('.books-list');
      booksContainer.appendChild(element);
    }
  }
  initActions() {
    const bookImgs = document.querySelectorAll('.book__image');
    for (let element of bookImgs) {
      console.log(bookImgs);
      element.addEventListener('dblclick', function (event) {
        event.preventDefault();
        if (event.target.offsetParent.classList.contains('book__image')) {
          element.classList.toggle('favorite');
        }
      });
    }
    const filtersForm = document.querySelector('.filters');
    let filters = [];
    const fn = function (event) {
      if (event.target.value === 'adults' && event.target.checked) {
        filters.push(event.target.value);
      } else if (event.target.value === 'nonFiction' && event.target.checked) {
        filters.push(event.target.value);
      } else {
        let filterIndex = filters.indexOf(event.target.value);
        filters.splice(filterIndex, 1);
      }
      this.filterBooks(dataSource.books, filters);
    }
    filtersForm.addEventListener('click', fn.bind(this));
  }
  filterBooks(books, filters) {
    for (let book of books) {
      let shouldBeHidden = false;
      for (let filter of filters) {
        if (book.details[filter] === true) {
          shouldBeHidden = true;
          break;
        }
      }
      const bookID = document.querySelector(`.book__image[data-id='${book.id}']`);
      if (shouldBeHidden) {
        bookID.classList.add('hidden');
      } else {
        bookID.classList.remove('hidden');
      }
    }
  }
  determinRatingBgc(booksRating) {
    switch (booksRating) {
      case booksRating < 6:
        return 'linear-gradient(to bottom, #fefcea 0 %, #f1da36 100 %)';
      case booksRating > 6 && booksRating <= 8:
        return 'linear-gradient(to bottom, #fefcea 0 %, #f1da36 100 %)';
      case booksRating > 8 && booksRating <= 9:
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      case booksRating > 9:
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      default:
        return 'linear-gradient(to bottom, #fefcea 0 %, #f1da36 100 %)';
    }
  }
}

const app = new BooksList();