function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => !book.borrows[0].returned).length
}
//Helper Function
function countGenres(books) {
  const genreCount = books.reduce((acc, book) => {
    const genre = book.genre;
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});
  return genreCount;
}

function getMostCommonGenres(books) {
  let genreCount = countGenres(books);
  const sortedGenres = Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a]);

  return sortedGenres.slice(0, 5).map((genre) => ({ name: genre, count: genreCount[genre] }));
}

function getMostPopularBooks(books) {
  const popularBooks = books
  .map((book) => ({ name: book.title, count: book.borrows.length }))
  .sort((a, b) => b.count - a.count);

return popularBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorBorrowCount = authors.map((author) => {
    const authorBooks = books.filter((book) => book.authorId === author.id);
    const borrowCount = authorBooks.reduce((acc, book) => acc + book.borrows.length, 0);
    return { name: `${author.name.first} ${author.name.last}`, count: borrowCount };
  });

  const sortedAuthors = authorBorrowCount.sort((a, b) => b.count - a.count);

  return sortedAuthors.slice(0, 5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
