import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { baseUrl, urlDeleteOrderBook,
} from '../../shared/constants/url';
import {getLocalStorage} from '../../shared/utils/save-local-storage';


export const fetchDeleteOrderBook = createAsyncThunk (
    'oneBookSlice/fetchDeleteOrderBook',
    async (id: number, { rejectWithValue })=> {
        try {
            const jwtToken = getLocalStorage('jwt');
            const response = await axios.delete(`${baseUrl}${urlDeleteOrderBook}/${id}`, {headers: {
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





