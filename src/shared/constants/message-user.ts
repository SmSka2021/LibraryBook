import {MessageUserRegistration} from '../../interfaces/interfaces';

export const messageEnter: MessageUserRegistration = {
    titleMessage: 'Регистрация успешна',
    textMessage: 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль',
    action: 'enter',
    btnTitle: 'вход',
};
export const messageRepeat: MessageUserRegistration = {
    titleMessage: 'Данные не сохранились',
    textMessage: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
    action: 'repeat',
    btnTitle: 'повторить',
};
export const messageBack: MessageUserRegistration = {
    titleMessage: 'Данные не сохранились',
    textMessage: 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail',
    action: 'back',
    btnTitle: 'назад к регистрации',
};
export const messageAuthError: MessageUserRegistration = {
    titleMessage: 'Вход не выполнен',
    textMessage: 'Что-то пошло не так. Попробуйте ещё раз',
    action: 'authError',
    btnTitle: 'повторить',
};
export const messageCheckEmail: MessageUserRegistration = {
    titleMessage: 'Письмо выслано',
    textMessage: 'Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля',
    action: 'notAction',
    btnTitle: '',
};
export const messageSuccessSaveNewPassword: MessageUserRegistration = {
    titleMessage: 'Новые данные сохранены',
    textMessage: 'Зайдите в личный кабинет, используя свои логин и новый пароль',
    action: 'enter',
    btnTitle: 'вход',
};
export const messageErNewPassword: MessageUserRegistration = {
    titleMessage: 'Данные не сохранились',
    textMessage: 'Что-то пошло не так. Попробуйте ещё раз',
    action: 'repeatFetchNewPassword',
    btnTitle: 'повторить',
};
export const emptyMessage: MessageUserRegistration = {
    titleMessage: '',
    textMessage: '',
    action: '',
    btnTitle: '',
};

export const commentSuccess: {text: string} = {
    text: 'Спасибо, что нашли время оценить книгу!',
};
export const commentError: {text: string} = {
    text: 'Оценка не была отправлена. Попробуйте позже!',
};
export const errorOrderMessage: {text: string} = {
    text: 'Что-то пошло не так, книга не забронирована. Попробуйте позже!',
};
export const successOrderMessage: {text: string} = {
    text: 'Книга забронирована. Подробности можно посмотреть на странице Профиль',
};

export const errorResetOrderMessage: {text: string} = {
    text: 'Не удалось снять бронирование книги. Попробуйте позже!',
};
export const successResetOrderMessage: {text: string} = {
    text: 'Бронирование книги успешно отменено!',
};

export const errorUpdateOrderMessage: {text: string} = {
    text: 'Изменения не были сохранены. Попробуйте позже!',
    // text: 'Что-то пошло не так, дату бронирования не удалось изменить. Попробуйте позже!',
};
export const successUpdateOrderMessage: {text: string} = {
    text:'Изменения успешно сохранены!',
    // text: 'Бронирование новой даты успешно изменено. Подробности можно посмотреть на странице Профиль',
};
export const successFetchAvatar: {text: string} = {
    text: 'Фото успешно сохранено!',
};
export const errorFetchAvatar: {text: string} = {
    text: 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!',
};
export const successFetchUpdateUser: {text: string} = {
    text: 'Изменения успешно сохранены!',
};
export const errorFetchUpdateUser: {text: string} = {
    text: 'Изменения не были сохранены. Попробуйте позже!',
};
export const successFetchRemoveOrder: {text: string} = {
    text: 'Бронирование книги успешно отменено!',
};
export const errorFetchRemoveOrder: {text: string} = {
    text: 'Не удалось снять бронирование книги. Попробуйте позже!',
};

export const successUpdateComment: {text: string} = {
    text: 'Спасибо, что нашли время изменить оценку!',
};
export const errorUpdateComment: {text: string} = {
    text: 'Изменения не были сохранены. Попробуйте позже!',
};