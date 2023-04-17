import {createSlice} from '@reduxjs/toolkit';
import {fetchRegistrationUser} from '../thunks/registration-thunk';
import {
    emptyMessage, errorFetchAvatar, errorFetchUpdateUser,
    messageAuthError,
    messageBack, messageCheckEmail,
    messageEnter, messageErNewPassword,
    messageRepeat, messageSuccessSaveNewPassword, successFetchAvatar, successFetchUpdateUser
} from '../../shared/constants/message-user';
import {saveLocalStorage, saveLocalStorageStr} from '../../shared/utils/save-local-storage';
import {fetchAuthUser} from '../thunks/auth-thunk';
import {fetchNewPassword} from '../thunks/new-password-thunk';
import {fetchResetPassword} from '../thunks/reset-password-thunk';
import {ProfileUser} from "../../interfaces/interfaces";
import {fetchProfileUser} from "../thunks/profile-thunk";
import {fetchLoadAvatar} from "../thunks/load-avatar-thunk";
import {fetchEditAvatar} from "../thunks/edit-avatar-thunk";
import {fetchEditDataUser} from "../thunks/edit-data-user-thunk";



export interface UserDataState {
    messageAvatar:{text: string};
    successFetchAvatar: string;
    successFetchUpdateAvatar: string;
    successFetchUpdateUser: string;
    isShowMessageAvatar: boolean;
    idAvatar: number;
    profileUser: ProfileUser | null,
    responseUser: {
        jwt: string,
        user: {
            id: number,
            username: string,
            email: string,
            provider: string,
            confirmed: boolean,
            blocked: boolean,
            createdAt: string,
            updatedAt: string,
            firstName: string,
            lastName: string,
            phone: string,
        }
    },
    userData: {
        username: string,
        password: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
    }
    isShowLoader: boolean,
    error: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    messageUser: {
        titleMessage: string,
        textMessage: string,
        action: string,
        btnTitle: string,
    };
    stepsRegistration: string;
    isShowAuth: boolean;
    errorAuth: boolean;
    isShowForgot: boolean;
    isErrorFetchNewPassword: boolean;
    messageErrorPassword: string;
    isShowMessage: boolean,
    dataUserForResetPassword: {
        password:  string;
        passwordConfirmation:  string;
        code: string;
     }
     isAuth: boolean;
}

const initialState: UserDataState = {
    isShowMessageAvatar:false,
    messageAvatar:{text: ''},
    successFetchAvatar: '',
    successFetchUpdateAvatar: '',
    successFetchUpdateUser: '',
    idAvatar: 0,
    profileUser : null,
    responseUser: {
        jwt:'',
        user: {
            id: 0,
            username: '',
            email: '',
            provider: '',
            confirmed: false,
            blocked: false,
            createdAt: '',
            updatedAt: '',
            firstName:'',
            lastName:'',
            phone: '',
        }
    },
    userData: {
        email: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
    },
    isShowLoader: false,
    error: false,
    status: 'idle',
    messageUser: {
        titleMessage: '',
        textMessage: '',
        action: '',
        btnTitle: '',
    },
    stepsRegistration: '1',
    isShowAuth: true,
    errorAuth: false,
    isShowMessage: false,
    isShowForgot: true,
    isErrorFetchNewPassword: false,
    messageErrorPassword: '',
    dataUserForResetPassword: {
        password:  '',
        passwordConfirmation: '',
        code: '',
    },
    isAuth: false,
}

export const userDataSlice = createSlice({
    name: 'userDataSlice',
    initialState,
    reducers: {
        setUserName: (state: UserDataState, action) => {
            /* eslint-disable no-param-reassign */
            state.userData.username = action.payload.username;
        },
        setUserPassword: (state: UserDataState, action) => {
            /* eslint-disable no-param-reassign */
            state.userData.password = action.payload.password;
        },
        setUserFirstName: (state: UserDataState, action) => {
            /* eslint-disable no-param-reassign */
            state.userData.firstName = action.payload.firstName;
        },
        setUserLastName: (state: UserDataState, action) => {
            /* eslint-disable no-param-reassign */
            state.userData.lastName = action.payload.lastName;
        },
        setUserEmail: (state: UserDataState, action) => {
            /* eslint-disable no-param-reassign */
            state.userData.email = action.payload.email;
        },
        setUserPhone: (state: UserDataState, action) => {
            /* eslint-disable no-param-reassign */
            state.userData.phone = action.payload.phone;
        },
        setMessageUser: (state: UserDataState, action) => {
            /* eslint-disable no-param-reassign */
            state.messageUser.titleMessage = action.payload.messageUser.titleMessage;
            state.messageUser.textMessage = action.payload.messageUser.textMessage;
            state.messageUser.action = action.payload.messageUser.action;
            state.messageUser.btnTitle = action.payload.messageUser.btnTitle;
        },
        setResetMessageUser: (state: UserDataState, action) => {
            /* eslint-disable no-param-reassign */
            state.messageUser = emptyMessage;
        },
        setStepsRegistration: (state: UserDataState, action) => {
            /* eslint-disable no-param-reassign */
            state.stepsRegistration = action.payload.step;
        },
        setIsShowAuth: (state: UserDataState) => {
            /* eslint-disable no-param-reassign */
            state.isShowAuth = true;
        },
        setIsShowForgot: (state: UserDataState) => {
            /* eslint-disable no-param-reassign */
            state.isShowForgot = false;
        },
        setNotErrorAuth: (state: UserDataState) => {
            /* eslint-disable no-param-reassign */
            state.errorAuth = false;
        },
        setNewPassword: (state: UserDataState, action) => {
            /* eslint-disable no-param-reassign */
            state.dataUserForResetPassword.password = action.payload.newPassword;
            state.dataUserForResetPassword.passwordConfirmation = action.payload.newPassword;
        },
        setNewCodePassword: (state: UserDataState, action) => {
            /* eslint-disable no-param-reassign */
            state.dataUserForResetPassword.code = action.payload.code;
        },
        setIsShowMessage: (state: UserDataState, action) => {
            /* eslint-disable no-param-reassign */
            state.isShowMessage = action.payload.isShowMessage;
        },
        setResetIsAuth: (state: UserDataState) => {
            /* eslint-disable no-param-reassign */
            state.isAuth = false;
        },
        setCloseMessageAvatar: (state: UserDataState) => {
            /* eslint-disable no-param-reassign */
            state.isShowMessageAvatar = false;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchRegistrationUser.pending, (state: UserDataState)=> {
            state.isShowLoader = true;
            state.status = 'loading';
            state.error = false;
            state.messageUser = emptyMessage;
        })
        builder.addCase(fetchRegistrationUser.fulfilled, (state: UserDataState, {payload}) => {
            state.messageUser = messageEnter;
            state.responseUser = payload.dataUser;
            state.stepsRegistration = '';
            state.isShowMessage = true;
            state.isShowLoader = false;
            state.status = 'succeeded';
            state.error = false;
            saveLocalStorage('jwt',payload.dataUser.jwt);

        })
        builder.addCase(fetchRegistrationUser.rejected, (state: UserDataState, action) => {
            if(action?.error?.message?.includes('400')) {
                state.messageUser = messageBack;
            } else {
                state.messageUser = messageRepeat;
            }
            state.isShowLoader = false;
            state.status = 'failed';
            state.error = true;
            state.isShowMessage = true;
            state.stepsRegistration = '';
        })
        builder.addCase(fetchAuthUser.pending, (state: UserDataState)=> {
            state.isShowLoader = true;
            state.status = 'loading';
            state.error = false;
            state.errorAuth = false;
            state.messageUser = emptyMessage;
        })
        builder.addCase(fetchAuthUser.fulfilled, (state: UserDataState, {payload}) => {
            state.responseUser = payload.dataUser;
            state.errorAuth = false;
            state.isAuth = true;
            state.isShowLoader = false;
            state.status = 'succeeded';
            state.error = false;
            saveLocalStorageStr('auth','true');
            saveLocalStorage('jwt',payload.dataUser.jwt);
            saveLocalStorage('name',payload.dataUser.user.username);
            saveLocalStorage('idUser',payload.dataUser.user.id);
        })
        builder.addCase(fetchAuthUser.rejected, (state: UserDataState, action) => {
            if(action?.error?.message?.includes('400')) {
                state.errorAuth = true;
            } else {
                state.isShowMessage = true;
                state.messageUser = messageAuthError;
                state.isShowAuth = false;
                state.errorAuth = false;
            }
            state.isShowLoader = false;
            state.status = 'failed';
            state.error = true;
        })
        builder.addCase(fetchNewPassword.pending, (state: UserDataState)=> {
            state.isShowLoader = true;
            state.status = 'loading';
            state.error = false;
            state.messageUser = emptyMessage;
        })
        builder.addCase(fetchNewPassword.fulfilled, (state: UserDataState, {payload}) => {
            if(payload.status === 'ok') {
                state.messageUser = messageCheckEmail;
                state.isShowMessage = true;
                state.isShowForgot = false;
            }
            if(payload.status === 'error') {
                state.isShowForgot = true;
                state.isShowMessage = false;
                state.messageErrorPassword = payload.message;
                state.isErrorFetchNewPassword = true;
            }
            state.isShowLoader = false;
            state.status = 'succeeded';
            state.error = false;
        })
        builder.addCase(fetchNewPassword.rejected, (state: UserDataState) => {
            state.isShowLoader = false;
            state.status = 'failed';
            state.error = true;
        })

        builder.addCase(fetchResetPassword.pending, (state: UserDataState)=> {
            state.isShowLoader = true;
            state.status = 'loading';
            state.error = false;
            state.messageUser = emptyMessage;
        })
        builder.addCase(fetchResetPassword.fulfilled, (state: UserDataState, {payload}) => {
            state.isShowForgot = false;
            state.messageUser = messageSuccessSaveNewPassword;
            state.isShowMessage = true;
            state.isShowLoader = false;
            state.status = 'succeeded';
            state.error = false;
            if(payload.dataUser) {
                state.responseUser = payload.dataUser;
                saveLocalStorage('jwt',payload.dataUser.jwt);
            }
        })
        builder.addCase(fetchResetPassword.rejected, (state: UserDataState) => {
            state.isShowLoader = false;
            state.status = 'failed';
            state.error = true;
            state.messageUser = messageErNewPassword;
            state.isShowMessage = true;
            state.isShowForgot = false;
        })
        builder.addCase(fetchProfileUser.pending, (state: UserDataState)=> {
            state.isShowLoader = true;
            state.status = 'loading';
            state.error = false;
        })
        builder.addCase(fetchProfileUser.fulfilled, (state: UserDataState, {payload}) => {
            state.isShowForgot = false;

            state.isShowLoader = false;
            state.status = 'succeeded';
            state.error = false;
            if(payload.dataUser) {
                state.profileUser = payload.dataUser;
                saveLocalStorage('firstName',payload.dataUser.firstName);
                saveLocalStorage('lastName',payload.dataUser.lastName);
            }

        })
        builder.addCase(fetchProfileUser.rejected, (state: UserDataState) => {
            state.isShowLoader = false;
            state.status = 'failed';
            state.error = true;
        })
        builder.addCase(fetchLoadAvatar.pending, (state: UserDataState)=> {
            state.isShowLoader = true;
            state.status = 'loading';
            state.error = false;
            state.successFetchAvatar = '';
            state.messageUser = emptyMessage;
        })
        builder.addCase(fetchLoadAvatar.fulfilled, (state: UserDataState, {payload}) => {
               state.successFetchAvatar = 'success';
               state.idAvatar=payload.dataUser;
               state.isShowLoader = false;
        })
        builder.addCase(fetchLoadAvatar.rejected, (state: UserDataState) => {
            state.isShowLoader = false;
            state.messageAvatar = errorFetchAvatar;
            state.isShowMessageAvatar = true;
            state.successFetchAvatar = 'error';
        })
        builder.addCase(fetchEditAvatar.pending, (state: UserDataState)=> {
            state.isShowLoader = true;
            state.status = 'loading';
            state.error = false;
            state.successFetchAvatar = '';
            state.messageUser = emptyMessage;
            state.messageAvatar.text= '';
            state.isShowMessageAvatar = false;
            state.successFetchUpdateAvatar = '';
        })
        builder.addCase(fetchEditAvatar.fulfilled, (state: UserDataState, {payload}) => {
            if(payload.dataUser)   state.profileUser = payload.dataUser;
            state.isShowLoader = false;
            state.messageAvatar = successFetchAvatar;
            state.isShowMessageAvatar = true;
            state.successFetchUpdateAvatar = 'success';
        })
        builder.addCase(fetchEditAvatar.rejected, (state: UserDataState) => {
            state.isShowLoader = false;
            state.messageAvatar = errorFetchAvatar;
            state.isShowMessageAvatar = true;
            state.successFetchUpdateAvatar = 'error';
        })
        builder.addCase(fetchEditDataUser.pending, (state: UserDataState)=> {
            state.isShowLoader = true;
            state.status = 'loading';
            state.error = false;
            state.messageUser = emptyMessage;
            state.messageAvatar.text= '';
            state.isShowMessageAvatar = false;
            state.successFetchUpdateUser = '';
        })
        builder.addCase(fetchEditDataUser.fulfilled, (state: UserDataState, {payload}) => {
            if(payload.dataUser)   state.profileUser = payload.dataUser;
            state.isShowLoader = false;
            state.messageAvatar = successFetchUpdateUser;
            state.isShowMessageAvatar = true;
            state.successFetchUpdateUser = 'success';
            saveLocalStorage('firstName',payload.dataUser.firstName);
            saveLocalStorage('lastName',payload.dataUser.lastName);
            saveLocalStorage('name',payload.dataUser.username);
        })
        builder.addCase(fetchEditDataUser.rejected, (state: UserDataState) => {
            state.isShowLoader = false;
            state.messageAvatar = errorFetchUpdateUser;
            state.successFetchUpdateUser = 'error';
            state.isShowMessageAvatar = true;
        })
    }

})

export const {
    setUserName,
    setUserPassword,
    setUserFirstName,
    setUserLastName,
    setUserEmail,
    setUserPhone,
    setIsShowMessage,
    setIsShowAuth,
    setNotErrorAuth,
    setStepsRegistration,
    setNewPassword,
    setNewCodePassword,
    setResetIsAuth,
    setResetMessageUser,
    setCloseMessageAvatar,
}  = userDataSlice.actions
