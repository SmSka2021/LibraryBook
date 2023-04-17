import React from 'react';

export interface PropsBook {
    listCheck: boolean;
    bookOne: IBook;
}

export interface PropsMain {
    changeView: FuncBoolean;
}

export type FuncBoolean = (a: boolean) => void;

export type FuncVoid = () => void;

export type FuncVoidEvent = ((e: MouseEvent) => void)


export interface IReview {
    id: string,
    image: string,
    name: string,
    date: string,
    rating: number,
    text: string,
}

export interface Link {
    name: string,
    count: string,
    paths: string
}


export interface PropsNavigate {
    dataId: string,
    navigationBurger: string,
}

export interface IBook {
    issueYear?: string,
    rating?: number | null,
    title: string,
    authors?: string[],
    image?: Image,
    categories: string[],
    id: number,
    booking?: {
        id: number,
        order: true,
        dateOrder?: string,
        customerId?: number,
        customerFirstName?: string,
        customerLastName?: string,
    } | null,
    delivery?: {
        id: number,
        handed: true,
        dateHandedFrom?: string,
        dateHandedTo?: string,
        recipientId?: number,
        recipientFirstName?: string,
        recipientLastName?: string,
    } | null,
    histories?: Array<{ id?: number, userId?: number }> | null
}

interface Image {
    url: string,
}

export interface CategoriesBooks {
    name: string,
    path: string,
    id: number
}

export interface OneBook {
    id: number,
    title: string,
    rating?: number,
    issueYear?: string,
    description?: string,
    publish?: string,
    pages?: string,
    cover?: string,
    weight?: string,
    format?: string,
    ISBN?: string,
    producer?: string,
    authors?: string[],
    images?: ImgOneBook[],
    categories: string[],
    comments?: CommentsOneBook[],
    booking?: {
        id: number,
        order: boolean,
        dateOrder?: string,
        customerId?: number,
        customerFirstName?: string,
        customerLastName?: string,
    },
    delivery?: {
        id: number,
        handed: boolean,
        dateHandedFrom?: string,
        dateHandedTo?: string,
        recipientId?: number,
        recipientFirstName?: string,
        recipientLastName?: string
    },
    histories?: HistoryOneBook[],
}

export interface ImgOneBook {
    url: string
}

export interface CommentsOneBook {
    id: number,
    rating: number,
    text?: string,
    createdAt: string,
    user?: {
        commentUserId: number,
        firstName: string,
        lastName: string,
        avatarUrl?: string,
    }
}

interface HistoryOneBook {
    id?: number,
    userId?: number
}

export interface CountCategory {
    [key: string]: number;
}

export interface InputTypesRegistration {
    username?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    passwordConfirmation?: string,
}

export interface InputTypesUpdateUser {
    login?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
}
export interface MessageUserRegistration {
    titleMessage: string,
    textMessage: string,
    action: string,
    btnTitle: string,
};

export interface UserDataRegistration {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
}

export interface UserRequestAuth {
    identifier: string,
    password: string,
}

export interface ResetPasswordFetchBody {
    password: string,
    passwordConfirmation: string,
    code: string,
}

export type InputChange = React.ChangeEvent<HTMLInputElement>
export type TextareaChange = React.ChangeEvent<HTMLTextAreaElement>
export type SelectChange = React.ChangeEvent<HTMLSelectElement>
export type MouseClick = React.MouseEventHandler<HTMLDivElement>

export interface CreateCommentFetch {
    data: {
        rating: number,
        text: string,
        book: string,
        user: string
    }
}

export interface DayOfWeek {
    date: Date,
    day: string,  // " пятница"
    dayNumber: number, // 3
    dayNumberInWeek: number, // 6
    dayShort: string, //  "пт"
    month: string, // "март"
    monthIndex: number, // 2
    monthNumber: number, //  3
    monthShort: string, // "март"
    timestamp: number
    week: number, //  9
    year: number, // 2023
    yearShort: string, // "23"
}

export interface CalendarProps {
    locale?: string;
    selectedDate: Date;
    selectDate: (date: Date) => void;
    firstWeekDayNumber?: number;
}

export interface OrderBookFetch {
    data: {
        order: boolean,
        dateOrder: Date,
        book: string,
        customer: string,
    }
}

export interface UpdateOrderBookFetch {
    fetchData: {
        data: {
            order: boolean,
            dateOrder: Date,
            book: string,
            customer: string,
        }
    }
    idBooking: number;
}
export interface UpdateCommentFetch {
    fetchData: {
        data: {
            rating: number,
            text: string,
            book: string,
            user: string,
        }
    }
        idComment: number,

}
export interface ProfileUser {
    id: number,
    username: string,
    email: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: Date,
    updatedAt: Date,
    firstName: string,
    lastName: string,
    phone: string,
    role: {
        id: number,
        name: string,
        description: string,
        type: string,
    },
    comments: [
        {
            id: number,
            rating: number,
            text: null | string,
            bookId: number
        }
    ],
    avatar: string,
    booking: {
        id: number,
        order: boolean,
        dateOrder: Date,
        book: {
            id: number,
            title: string,
            rating: number,
            issueYear: string,
            authors: string[],
            image: null | string,
        }
    },
    delivery: {
        id: number,
        handed: boolean,
        dateHandedFrom: Date,
        dateHandedTo: Date,
        book: {
            id: number,
            title: string,
            rating: number,
            issueYear: null | string,
            authors: string[],
            image: null | string,
        }
    },
    history: {
        id: number,
        books: [
            {
                id: number,
                title: string,
                rating: number,
                issueYear: null | string,
                authors: string[],
                image: null | string,
            },
        ]
    }
}

export interface EditUserFetch {
    fetchData: {
        username: string,
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        phone: string,
    }
    userId: string;
}

export interface BookOrder {
    id: number,
    title: string,
    rating: number | null,
    issueYear: string | null,
    authors: string[],
    image: null | string,
}
