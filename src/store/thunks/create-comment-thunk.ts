import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {baseUrl, urlCreateComment, } from '../../shared/constants/url';
import {CreateCommentFetch, } from '../../interfaces/interfaces';
import {getLocalStorage} from '../../shared/utils/save-local-storage';



export const fetchCreateComment = createAsyncThunk (
    'oneBookSlice/fetchCreateComment',
    async (dataUser: CreateCommentFetch, { rejectWithValue })=> {
        try {
            const jwtToken = getLocalStorage('jwt');
            const response = await axios.post(`${baseUrl}${urlCreateComment}`, dataUser, {headers: {
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





