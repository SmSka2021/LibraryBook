import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {baseUrl, urlAuth} from '../../shared/constants/url';
import {UserRequestAuth} from '../../interfaces/interfaces';
import {getLocalStorage} from "../../shared/utils/save-local-storage";

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjY2NTQ0MzI5LCJleHAiOjE2NjkxMzYzMjl9.erLicGJGH5wttjAF6xDWMcxDJOIJvEnFLFzuMVzUkSU'

export const fetchAuthUser = createAsyncThunk (
    'userDataSlice/fetchAuthUser',
    async (dataUser: UserRequestAuth, { rejectWithValue })=> {
        try {
            const jwtToken = getLocalStorage('jwt') || jwt
            const response = await axios.post(`${baseUrl}${urlAuth}`, dataUser,
                // { headers: { 'Authorization':  `Bearer ${jwtToken}` },}
                )


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





