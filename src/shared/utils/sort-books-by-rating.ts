import {IBook} from '../../interfaces/interfaces';

export const sortBooksByRating= (allBooks: IBook[], isSortUp: boolean): IBook[]  => {

    const booksBookWithRating0  = allBooks.filter((book: IBook) => book.rating === 0);
    const booksBookWithRating  = allBooks.filter((book: IBook) => typeof book.rating === 'number' && book.rating);
    const booksNotRating= allBooks.filter((book: IBook) => typeof book.rating !== 'number');

    if(isSortUp) {
        booksBookWithRating.sort((a, b) => (a.rating as number) - (b.rating as number));

        return [...booksNotRating, ...booksBookWithRating0, ...booksBookWithRating]
    }
        booksBookWithRating.sort((a, b) => (b.rating as number) - (a.rating as number));

        return [ ...booksBookWithRating, ...booksBookWithRating0, ...booksNotRating]
}
