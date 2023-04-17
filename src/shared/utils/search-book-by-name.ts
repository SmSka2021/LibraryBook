import {IBook} from '../../interfaces/interfaces';

export const searchBookByName = (allBooks: IBook[], searchItem: string): IBook[] => {

    if(searchItem) {

       return allBooks.filter(
            (book) => book.title.toLowerCase().includes(searchItem.toLowerCase())
        )
    }

    return allBooks;
}
