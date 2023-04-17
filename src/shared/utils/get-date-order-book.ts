import {IBook} from '../../interfaces/interfaces';

export const getDateOrderBook = (allBooks: IBook[], idBook: number): string => {
    const book = allBooks.find((book) => book?.id === idBook);

    return  book?.booking?.dateOrder as string;
}
