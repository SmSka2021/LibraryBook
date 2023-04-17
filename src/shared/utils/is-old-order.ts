export function isOldOrder(dateOrder: Date | undefined):boolean {
    const today = new Date().getDate();
    const todayMonth = new Date().getMonth();
    const todayYear = new Date().getFullYear();

    if(dateOrder) {
        const dateOrderDay = new Date(dateOrder).getDate();
        const dateOrderMonth = new Date(dateOrder).getMonth();
        const dateOrderYear = new Date(dateOrder).getFullYear();

        if((dateOrderYear > todayYear) || (dateOrderMonth > todayMonth)) return true;

        return (today> dateOrderDay);

    }
    return false;
}