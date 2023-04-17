import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {baseUrl, urlSetOrderBook, urlUserData} from '../../shared/constants/url';
import {getLocalStorage} from "../../shared/utils/save-local-storage";




export const fetchProfileUser = createAsyncThunk (
    'userDataSlice/fetchProfileUser',
    async (_, { rejectWithValue })=> {
            try {
                const jwtToken = getLocalStorage('jwt');
                const response = await axios.get(`${baseUrl}${urlUserData}`,  {headers: {
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