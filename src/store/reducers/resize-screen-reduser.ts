import {createSlice, PayloadAction} from '@reduxjs/toolkit'


interface ResizeScreenState {
    widthScreen: number
}

const initialState: ResizeScreenState = {
    widthScreen: window.innerWidth
}

export const resizeScreenSlice = createSlice({
    name: 'resizeScreen',
    initialState,
    reducers: {
        resizeScreen: (state, action: PayloadAction<{size: number}>) => {
            // eslint-disable-next-line no-param-reassign
            state.widthScreen = action.payload.size
        },
    }
})

export const {resizeScreen}  = resizeScreenSlice.actions
