import {createAsyncThunk} from '@reduxjs/toolkit';
import {baseUrl, urlAllBooks} from '../../shared/constants/url';
import {countBookInCategory} from '../../shared/utils/count-book-in-category';
import {CountCategory} from '../../interfaces/interfaces';
import {getLocalStorage} from '../../shared/utils/save-local-storage';



export const fetchBooks = createAsyncThunk (
    'booksSlice/fetchBooks',
    async (_, { rejectWithValue })=> {
        try {
            const jwtToken = getLocalStorage('jwt');

            const response = await fetch(`${baseUrl}${urlAllBooks}`, {headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${jwtToken}`
               },
            })

            if(response.ok) {
                const result = await response.json()
                const countCategoryBooks: CountCategory = countBookInCategory(result)

                return { allBooks: result, countCategoryBooks}
            }

            return rejectWithValue('Failed to get response from server')
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
)
