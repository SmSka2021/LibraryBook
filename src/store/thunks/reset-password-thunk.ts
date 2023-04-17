import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {baseUrl, urlResetPassword} from '../../shared/constants/url';
import {ResetPasswordFetchBody} from '../../interfaces/interfaces';



export const fetchResetPassword = createAsyncThunk(
    'userDataSlice/fetchResetPassword',
    async (dataUser: ResetPasswordFetchBody, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUrl}${urlResetPassword}`, dataUser);

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

