import {createAsyncThunk} from '@reduxjs/toolkit';
import {baseUrl, urlNewPassword} from '../../shared/constants/url';


export const fetchNewPassword = createAsyncThunk (
    'userDataSlice/fetchNewPassword',
    async (dataUser: {email:string}, { rejectWithValue })=> {
        try {
            const response = await fetch(`${baseUrl}${urlNewPassword}`, {
                method: 'POST',
                body:JSON.stringify(dataUser),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if(response.ok) {

                return { status: 'ok'}
            }
            if(!response.ok) {
                const result = await response.json();

                return { status: 'error', message: result.error.message}
            }

            return rejectWithValue('Failed to get response from server')
        } catch (err: any) {

            return rejectWithValue(err.response.data)
        }
    }
)
