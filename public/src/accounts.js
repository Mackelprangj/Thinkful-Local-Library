require("../data/books.js");
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acc1, acc2) => acc1.name.last.toLowerCase() > acc2.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  const {id: accountID} = account;
  return books.reduce((result, book) => {
    return (Object.keys(result + book.borrows.filter(borrow => borrow.id === accountID)).length)
  }, {});
}

function getBooksPossessedByAccount(account, books, authors) {
  const booksPossessed = [];
  books.forEach((book) => {
    book.author = authors.find((author) => author.id === book.authorId);
    book.borrows.forEach((borrow) => {
      if (!borrow.returned && borrow.id === account.id) {
        booksPossessed.push(book);
      }
    });
  });
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};