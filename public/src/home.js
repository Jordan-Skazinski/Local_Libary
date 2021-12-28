//this is a helper function for sortiong and slicing
function sortAndSlice (vars){
return vars.sort((authorOne, authorTwo) => authorTwo.count - authorOne.count).slice(0,5);
}

function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return  books.filter(book=> !book.borrows[0].returned).length
}


function getMostCommonGenres(books) {
  //this makes an array of just the genre names
  const genreNames = books.map(book=> book.genre)
  //makes an empty array
let counts = []
//loops through the genre names
  for(const name of genreNames) {  
    //returns eather a -1 if the current name isnt in counts array yet or the number of times it is including the current name
    let existing = counts.findIndex(obj=> obj.name === name)
   //if the name is in the array then this adds +1 to the count key
    if(existing >= 0){
     counts[existing].count++
     //if its not in the array the this pushes it in with a count of 1
   } else {
     counts.push({
      name: name,
      count: 1
    }) 
    }
  }
  //helper function
  return sortAndSlice (counts)
}

function getMostPopularBooks(books) {
  return books
  //takes the array of books then sorts it by how many times its been checked out
          .sort((bookOne, bookTwo) => bookOne.borrows.length > bookTwo.borrows.length ? -1 : 1)
          //then takes that sorted list and maps it down to just the book title and adds the amout of times its been checked out
          .map((book) => ({name: book.title, count: book.borrows.length}))
          //finaly cuts it to have only the top 5
          .slice(0,5);
}


function getMostPopularAuthors(books, authors) {
  let returnValue = [];
  //cycle through authors
  authors.forEach((author) => {
    //creates an object with the authors name value and a count key with a value of 0
    let person = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0
    };
    //cycles through books
    books.forEach((book) => {
      //if the author id in the book matches the authors id in authors array
      if (book.authorId === author.id) {
        //then add to the count value with how many times the book was checked out
        person.count += book.borrows.length;
      }
    });
    //adds the current iteration of person to the returnValue array
    returnValue.push(person);
  });
  //helper function
  return sortAndSlice(returnValue)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
