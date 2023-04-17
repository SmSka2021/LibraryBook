import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    baseUrl, urlEditComment, urlUpdateOrderBook
} from '../../shared/constants/url';
import {UpdateCommentFetch, UpdateOrderBookFetch} from '../../interfaces/interfaces';
import {getLocalStorage} from '../../shared/utils/save-local-storage';


export const fetchUpdateComment = createAsyncThunk (
    'oneBookSlice/fetchUpdateComment',
    async (dataComment: UpdateCommentFetch, { rejectWithValue })=> {
        try {
            const jwtToken = getLocalStorage('jwt');
            const response = await axios.put(`${baseUrl}${urlEditComment}/${dataComment.idComment}`, dataComment.fetchData, {headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${jwtToken}`
                },
            })

            return {status: response.status, dataUser: response.data}
        } catch (error) {

            if (axios.isAxiosError(error)) {
                throw error;
            } else {

                return rejectWithValue('This is not axios error')
            }
        }
    }
);





