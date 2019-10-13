//Book Class : Represent a book
class Book{
   constructor(title,author,isbn){
      this.title = title;
      this.author = author;
      this.isbn = isbn;
   }
}

//UI Class Handle UI TASK

class UI {
   static displayBooks () {
    
      const books  = Store.getBooks();

      books.forEach((book) =>UI.addBookToList(book));
   }

   static addBookToList(book){
      const list = document.querySelector('#book-list');
      const row = document.createElement('tr');
      row.innerHTML =`
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href='' class='delete'>x</a></td>
      `;
      list.appendChild(row);
   }
   
   static clearFields(){
      document.querySelector("#title").value ="";
      document.querySelector("#author").value ="";
      document.querySelector("#isbn").value ="";
   }

   static showAlert(message,className){
      const div = document.createElement('div');
      div.className = `alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const msg = document.querySelector('.msg');
      msg.append(div);
      setTimeout(() => div.remove(),3000);
   }

   static deleteBook(el){
      if(el.classList.contains('delete')){
         el.parentElement.parentElement.remove();
      }
   }
}

//Store Class : Handle Storage
class Store{
   static getBooks() {
      let books;
      if(localStorage.getItem('books') === null){
         books = [];
      }else{
         books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
   }
   static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books',JSON.stringify(books));
   }
   static removeBook(isbn) {  
      const books = Store.getBooks();
      books.forEach((book,index) => {
         if(book.isbn === isbn){
            books.splice(index,1);
         }
      });
      localStorage.setItem('books',JSON.stringify(books));   
   }
}
//Event : Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);
//Event : Add Books
document.querySelector('#book-form').addEventListener('submit',(e) =>{
   e.preventDefault();
   const title = document.querySelector('#title').value;
   const author  = document.querySelector("#author").value;
   const isbn = document.querySelector("#isbn").value;
   //Validate form 
   if(title === '' || author ==='' || isbn ===''){
      UI.showAlert('Pleass fill in all fields','danger');
   }else{
      const book = new Book(title,author,isbn);
      UI.addBookToList(book);
      //Add book to local storage
      Store.addBook(book);
      //show alert
      UI.showAlert('Data succesfully inserted','success');
      //Clear fields
      UI.clearFields();
   }
   
})
//Event : Remove a Book;
document.querySelector("#book-list").addEventListener('click',(e) => {
   e.preventDefault();
   //remove book from UI
   UI.deleteBook(e.target);

   //remove book from STORE
   Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //show alert
   UI.showAlert('Data succesfully removed','success');
});