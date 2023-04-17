import { createSlice } from '@reduxjs/toolkit'

interface OpenMenuState {
    isOpenMenu: boolean
}

const initialState: OpenMenuState = {
    isOpenMenu: false
}

export const visibleMenuSlice = createSlice({
    name: 'visibleMenu',
    initialState,
    reducers: {
        openMenu: state => {
            // eslint-disable-next-line no-param-reassign
            state.isOpenMenu = true
        },
        closeMenu: state => {
            // eslint-disable-next-line no-param-reassign
            state.isOpenMenu = false
        }
    }
})

export const { openMenu, closeMenu } = visibleMenuSlice.actions
