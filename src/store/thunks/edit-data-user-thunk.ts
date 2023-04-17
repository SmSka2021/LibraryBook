import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {baseUrl, urlLoadAvatar, urlResetPassword, urlUserEdit} from '../../shared/constants/url';
import {EditUserFetch, UserDataRegistration} from '../../interfaces/interfaces';
import {getLocalStorage} from "../../shared/utils/save-local-storage";



export const fetchEditDataUser = createAsyncThunk(
    'userDataSlice/fetchEditDataUser',
    async (dataUser: EditUserFetch, {rejectWithValue}) => {
        try {
            const jwtToken = getLocalStorage('jwt');
            const response = await axios.put(`${baseUrl}${urlUserEdit}/${dataUser.userId}`, dataUser.fetchData,
                {headers: {authorization: `Bearer ${jwtToken}`}});
console.log(response.data)
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

