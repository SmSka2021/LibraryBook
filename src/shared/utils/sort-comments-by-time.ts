import {CommentsOneBook} from '../../interfaces/interfaces';

export const sortCommentByTime = (comments: CommentsOneBook[]): CommentsOneBook[]  => {
    if(comments.length === 0) return comments;

    return comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}



