const formatPhone = (phoneNumber: string) => {
    var returnValue = phoneNumber.replace(/\D/g, "");
    returnValue = returnValue.replace(/^0/, "");
    returnValue = returnValue.replace(/^(\d{2})(\d)/g, "($1) $2");
    returnValue = returnValue.replace(/(\d)(\d{4})$/, "$1-$2");
    return returnValue;
}
export default formatPhone;