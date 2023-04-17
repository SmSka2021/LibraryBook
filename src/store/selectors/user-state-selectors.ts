import {RootState} from '../store';


export const isErrorAuthSelector = (state: RootState) => state.userState.errorAuth;
export const isErrorFetchPasswordSelector = (state: RootState) => state.userState.isErrorFetchNewPassword;
export const messageErrorPasswordSelector = (state: RootState) => state.userState.messageErrorPassword;
export const dataUserCodeSelector = (state: RootState) => state.userState.dataUserForResetPassword.code;
export const isShowLoaderAuthSelector = (state: RootState) => state.userState.isShowLoader;
export const dataMessageSelector = (state: RootState) => state.userState.messageUser;
export const dataUserSelector = (state: RootState) => state.userState.userData;
export const dataNewPasswordSelector = (state: RootState) => state.userState.dataUserForResetPassword;
export const isShowMessageSelector = (state: RootState) => state.userState.isShowMessage;
export const isAuthSelector = (state: RootState) => state.userState.isAuth;
export const isJwtSelector = (state: RootState) => state.userState.responseUser.jwt;
export const isShowAuthSelector = (state: RootState) => state.userState.isShowAuth;
export const isShowForgotSelector = (state: RootState) => state.userState.isShowForgot;
export const stepRegistrationSelector = (state: RootState) => state.userState.stepsRegistration;
export const idUserSelector = (state: RootState) => state.userState.responseUser.user.id;
export const passwordUserSelector = (state: RootState) => state.userState.userData.password;
export const profileUserSelector = (state: RootState) => state.userState.profileUser;
export const nameUserSelector = (state: RootState) => state.userState.profileUser?.username;
export const avatarUserSelector = (state: RootState) => state.userState.profileUser?.avatar;
export const idAvatarUserSelector = (state: RootState) => state.userState.idAvatar;
export const successFetchAvatarSelector = (state: RootState) => state.userState.successFetchAvatar;
export const successFetchUpdateAvatarSelector = (state: RootState) => state.userState.successFetchUpdateAvatar;

export const isShowMessageAvatarSelector = (state: RootState) => state.userState.isShowMessageAvatar;
export const textMessageAvatarSelector = (state: RootState) => state.userState.messageAvatar.text;
export const firstNameUserSelector = (state: RootState) => state.userState.profileUser?.firstName;
export const lastNameUserSelector = (state: RootState) => state.userState.profileUser?.lastName;
export const successUpdateUserSelector = (state: RootState) => state.userState.successFetchUpdateUser;
export const bookingSelector = (state: RootState) => state.userState.profileUser?.booking
export const bookingIdSelector = (state: RootState) => state.userState.profileUser?.booking.id;
export const deliverySelector = (state: RootState) => state.userState.profileUser?.delivery;
export const deliveryBookSelector = (state: RootState) => state.userState.profileUser?.delivery.book;
export const deliveryDateToSelector = (state: RootState) => state.userState.profileUser?.delivery.dateHandedTo;
export const historySelector = (state: RootState) => state.userState.profileUser?.history;
export const bookingBookSelector = (state: RootState) => state.userState.profileUser?.booking.book;
