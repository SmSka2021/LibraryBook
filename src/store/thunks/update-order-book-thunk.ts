import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    baseUrl,  urlUpdateOrderBook
} from '../../shared/constants/url';
import {UpdateOrderBookFetch} from '../../interfaces/interfaces';
import {getLocalStorage} from '../../shared/utils/save-local-storage';


export const fetchUpdateOrderBook = createAsyncThunk (
    'oneBookSlice/fetchUpdateOrderBook',
    async (dataBook: UpdateOrderBookFetch, { rejectWithValue })=> {
        try {
            const jwtToken = getLocalStorage('jwt');
            const response = await axios.put(`${baseUrl}${urlUpdateOrderBook}/${dataBook.idBooking}`, dataBook.fetchData, {headers: {
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





