export function isOldDelivery(dateOrder: Date | undefined):boolean {
    if(dateOrder)  return (new Date() > new Date(dateOrder));
    return false;
}