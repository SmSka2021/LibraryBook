import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    baseUrl, urlEditAvatar,
    urlSetOrderBook
} from '../../shared/constants/url';
import {OrderBookFetch} from '../../interfaces/interfaces';
import {getLocalStorage} from '../../shared/utils/save-local-storage';


export const fetchEditAvatar = createAsyncThunk (
    'userDataSlice/fetchEditAvatar',
    async (dataUser: {avatar:{avatar: number}, id: string}, { rejectWithValue })=> {
        try {

            const jwtToken = getLocalStorage('jwt');
            const response = await axios.put(`${baseUrl}${urlEditAvatar}/${dataUser.id}`, dataUser.avatar, {headers: {
                   authorization: `Bearer ${jwtToken}`
                },
            })
console.log(response)
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





