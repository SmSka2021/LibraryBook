export const mock = {
    delivery: {
        id: 1,
        handed: true,
        dateHandedFrom: new Date('2022-11-04T21:00:00.000Z'),
        dateHandedTo: new Date('2023-04-31T21:00:00.000Z'),
        book: {
            id: 2,
            title: 'Программирование на JAVA',
            rating: 4.2,
            issueYear: 2019,
            authors: [
                'Патрик Нимейер',
                'Дэниэл Леук'
            ],
            'image': null
        }
    },
    history: {
        id: 3,
        books: [
            {
                id: 103,
                title: 'Как 103',
                rating: 4,
                issueYear: '2020',
                authors: ['Джи Ким', 'Нейт Купер'],
                image: null
            },
            {
                id: 11,
                title: 'Комикс-путеводитель по HTML, CSS и WordPress',
                rating: null,
                issueYear: null,
                authors: ['Джи Ким', 'Нейт Купер'],
                image: "/uploads/10442229_0_5d1c5827e4.jpg"
            },
            {
                id: 12,
                title: 'Как создать сайт. Комикс-путеводитель по HTML, CSS и WordPress',
                rating: 5,
                issueYear: '2020',
                authors: ['Джи Ким', 'Нейт Купер'],
                image: "/uploads/10209755_0_Postroenie_biznes_modeley_Nastolnaya_kniga_stratega_i_novatora_Aleksandr_Ostervalder_Iv_Pine_931aabe20f.jpg"
            },
            {
                id: 12,
                title: 'Как создать сайт. Комикс-путеводитель по HTML, CSS и WordPress',
                rating: 5,
                issueYear: '2020',
                authors: ['Джи Ким', 'Нейт Купер'],
                image: "/uploads/10442229_0_5d1c5827e4.jpg"
            },
            {
                id: 14,
                title: 'Как создать сайт. Комикс-путеводитель по HTML, CSS и WordPress',
                rating: 5,
                issueYear: '2020',
                authors: ['Джи Ким', 'Нейт Купер'],
                image: null
            },
            {
                id: 15,
                title: 'Как создать сайт. Комикс-путеводитель по HTML, CSS и WordPress',
                rating: 5,
                issueYear: '2020',
                authors: ['Джи Ким', 'Нейт Купер'],
                image: "/uploads/10442229_0_5d1c5827e4.jpg"
            },
        ]
    }
}