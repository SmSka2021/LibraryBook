import {CategoriesBooks} from '../../interfaces/interfaces';

export const categoryBookPath = (categories: CategoriesBooks[], categoryBookName: string): string =>  categories.filter((category) => category.name === categoryBookName)[0].path
export const arrCategoryPath =(arrCategories:CategoriesBooks[], item: string | undefined): boolean => {
    if(item)  return  arrCategories.map((category)=> category.path).includes(item);

    return false;
}

