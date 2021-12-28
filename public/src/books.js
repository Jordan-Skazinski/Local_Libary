function findAuthorById(authors, id) {
  return authors.find(author=> author.id == id)
}

function findBookById(books, id) {
  return books.find(book=> book.id == id)
}
//sorts books into two diffrent arrays depending on ig they are checked out
function partitionBooksByBorrowedStatus(books) {
  
  return [
    //books that are checked out
    [...books.filter(book=> !book.borrows[0].returned)
    ],
    //books that arnt checked out
    [...books.filter(book=> book.borrows[0].returned)
    ]
  ]
}
//{}deconstructs the books array to get the borrows section only, since its done this way it acctualy has to be borrows since its referring to the key
function getBorrowersForBook({borrows}, accounts) {
 //makes an empty array
  const returnValue = [];
  //cycles through the deconstructed borrows array
  for (const borrow of borrows) {
    //finds an account in accounts that matches the id from the borrowed book and then decunstructs said account
    const {id, picture, age, name, company, email, registered} = accounts.find((account) => borrow.id === account.id);
    //makes a variable for the boolean of the book to gt it easier for the constructiong of the new obj
    const returned = borrow.returned
    //constructing a new object with the values needed. 
    const newObj = {
      id,
      returned,
      picture,
      age,
      name,
      company,
      email,
      registered
    }
    // if their is less then ten objects in the returnValue array then add the newObj
    returnValue.length >= 10 ? returnValue: returnValue.push(newObj);
  }
  return returnValue;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
