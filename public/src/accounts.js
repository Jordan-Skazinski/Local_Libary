function findAccountById(accounts, id) {
  return accounts.find(account=> account.id == id)
}

function sortAccountsByLastName(accounts) {
  //goes through accounts takeing in the previous val and the current one. Then it makes sure all the letters are uniform by turning all characters to undercase, finaly reasigning the index of the values
return accounts.sort((accountOne, accountTwo)=> (accountOne.name.last.toLowerCase() > accountTwo.name.last.toLowerCase() ? 1: -1))
}
// gets the total number of borrowed books each user has
function getTotalNumberOfBorrows(account, books) {
  return books
  //the .reduce takes in the previous book and adds the current book to it
          .reduce((prevBook, curBook) => {
            //if the previous book is empty then set previous book to an array of current object
            if (!prevBook) { prevBook = [ ...curBook.borrows, ] }
            //if not then add previous book to the array. now all the books are in the same array
            else {prevBook = [ ...prevBook, ...curBook.borrows, ] };
            return prevBook;
          }, [])
          // deconstructs books so you can get to the id and then match it with account.id
          .filter(({id}) => id === account.id)
          //finaly you get the length for the total number of books with the corresponding id
          .length;
  //return books
//  .filter(book=> account.id == book.borrows.filter(b=> b.id == account.id))
//.length
}
//gets the account id then checks it against the books array for any  currently checked out books
function getBooksPossessedByAccount(account, books, authors) {
  //starting with a filter to get an array of books that match id
 const borrowedBooks = books.filter(book => {
   //if the book is checked out and the book id matches the account id then it adds it to the array borrowedBooks
    if(!book.borrows[0].returned && book.borrows[0].id === account.id) {
      return book;
    }
  });
  //for loop to cycle borrowedBooks
  for(let i = 0; i < borrowedBooks.length; i++) {
    //decunstructiong borrowedBooks to make the object later
    const {id, title, authorId, borrows} = borrowedBooks[i];
    //finds the author with the authorId that was decunstructed, need this for the object as well
    const bookAuthor = authors.find(author => author.id === borrowedBooks[i].authorId);
    //setting borrowedBooks to an object that contains all the info we need
    borrowedBooks[i] = {
      id,
      title,
      authorId,
      author: bookAuthor,
      borrows,
    };
  }
  return borrowedBooks;

  /*const findBooksCheckedOut = books.filter(book=> book.borrows[0].id == account.id && !book.borrows[0].returned)
  console.log(findBooksCheckedOut)
  console.log("========================================")
  const findAuthor = authors.find(author=> {
    for(let book in findBooksCheckedOut) {
      author.id == book.authorId
      return authors
    }

  })
  console.log(findAuthor)
  console.log("========================================")
  // need to add the findBooksCheckedOut array with findAuthor object with findAuthor being in the 4th index postion
  console.log(findBooksCheckedOut.splice(4, 0, findAuthor))*/
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
