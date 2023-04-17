import {createAsyncThunk} from '@reduxjs/toolkit';
import {baseUrl, urlCategories} from '../../shared/constants/url';
import {getLocalStorage, isAuth} from '../../shared/utils/save-local-storage';



export const fetchCategoriesBooks = createAsyncThunk (
    'booksSlice/fetchCategoriesBooks',
    async (_, { rejectWithValue })=> {
        try {
            const jwtToken = getLocalStorage('jwt');

                const response = await fetch(`${baseUrl}${urlCategories}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${jwtToken}`
                    },
                })
                if (response.ok) {

                    return await response.json();
                }

                return rejectWithValue('Failed to get response from server')
        } catch (err: any) {

            return rejectWithValue(err.response.data)
        }
    }
)
