import {OneBook, IBook} from "../../interfaces/interfaces";
import {getLocalStorage} from "./save-local-storage";

export const isBookBusyUser = (book: OneBook | IBook | null, idUser: number): boolean => {
    const id = idUser ? `${idUser}` : getLocalStorage('idUser');

    if(id && book) {
        return book.booking?.customerId === +id;
    }
    return false;
}