import {IBook, CountCategory} from '../../interfaces/interfaces';

export const countBookInCategory = (allBooks: IBook[]): CountCategory => {
    const countCategory: CountCategory = {};

    allBooks.forEach((book: IBook) => {
        book.categories.forEach((category) => {
            if(countCategory[category]) {
                countCategory[category] += 1;
            } else {
                countCategory[category] = 1;
            }
        })
    })

    return countCategory
}
