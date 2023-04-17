import {CommentsOneBook} from '../../interfaces/interfaces';
import {getLocalStorage} from './save-local-storage';

export const isCommentUser = (comments: CommentsOneBook[]): boolean => {
    if(comments.length === 0) return false;
    const id = getLocalStorage('idUser');
    if(id) {
        return comments.some((comment) => comment.user?.commentUserId === +id);
    }
    return false;
}



