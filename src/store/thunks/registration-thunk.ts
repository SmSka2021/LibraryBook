import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl, urlRegistrationUser} from '../../shared/constants/url';
import {UserDataRegistration} from '../../interfaces/interfaces';


export const fetchRegistrationUser = createAsyncThunk (
    'userDataSlice/fetchRegistrationUser',
    async (dataUser: UserDataRegistration, { rejectWithValue })=> {
        try {
            const response = await axios.post(`${baseUrl}${urlRegistrationUser}`,dataUser);
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






