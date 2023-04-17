import {IBook} from '../../interfaces/interfaces';

export const filterBooksToCategory = (allBooks: IBook[], categoryBookName: string): IBook[] => allBooks.filter((book) => book.categories.some((category) => category === categoryBookName))
