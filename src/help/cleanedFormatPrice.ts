const cleanedFormatPrice = (money: string) => {
    // Remove o símbolo de moeda e espaços
    let cleanedString = money.replace(/[R$\s]/g, '');
    // Remove o separador de milhar e substitui a vírgula pelo ponto
    cleanedString = cleanedString.replace(/\./g, '').replace(/,/, '.');
    const floatNumber = parseFloat(cleanedString);
    return floatNumber;
}
export default cleanedFormatPrice;