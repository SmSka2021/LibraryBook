import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {baseUrl, urlLoadAvatar, urlResetPassword} from '../../shared/constants/url';
import {ResetPasswordFetchBody} from '../../interfaces/interfaces';
import {getLocalStorage} from "../../shared/utils/save-local-storage";



export const fetchLoadAvatar = createAsyncThunk(
    'userDataSlice/fetchLoadAvatar',
    async (dataUser: any, {rejectWithValue}) => {
        try {
            const jwtToken = getLocalStorage('jwt');
            const response = await axios.post(`${baseUrl}${urlLoadAvatar}`, dataUser,
                {headers: {authorization: `Bearer ${jwtToken}`}});
console.log(response.data)
            return {status: response.status, dataUser: response.data[0].id}
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error;
            } else {

                return rejectWithValue('This is not axios error')
            }
        }
    }
);

