import {createAsyncThunk} from '@reduxjs/toolkit';
import {baseUrl, urlAllBooks} from '../../shared/constants/url';
import {getLocalStorage} from '../../shared/utils/save-local-storage';

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjY2NTQ0MzI5LCJleHAiOjE2NjkxMzYzMjl9.erLicGJGH5wttjAF6xDWMcxDJOIJvEnFLFzuMVzUkSU'

export const fetchOneBook = createAsyncThunk (
    'oneBookSlice/fetchOneBook',
    async (id: string, { rejectWithValue })=> {
        try {
            const jwtToken = getLocalStorage('jwt');
            const response = await fetch(`${baseUrl}${urlAllBooks}/${id}`,{headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  `Bearer ${jwtToken}`
                },
            })
            const res = await response.json();
            if(response.ok) {
                return {book: res, id}
            }
                console.log('error 404')
                return {status: 'error'}

        } catch (err: any) {

            return rejectWithValue(err.response.data)
        }
    }
)
