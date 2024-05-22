const toBRL = (value: string): string => {
    // Remove todos os caracteres não numéricos
    let tmp = value.replace(/[\D]+/g, '');
    
    if (tmp.length === 0) {
        return '0,00';
    }

    tmp = parseInt(tmp, 10).toString();

    // Adiciona vírgula antes dos dois últimos dígitos
    tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
    if (tmp.length === 1) {

        tmp = `0,0${tmp}`
    }
    if (tmp.length === 3) {

        tmp = `0${tmp}`
    }

    if (tmp.length > 6) {
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2})$/g, '.$1,$2');
    }

    if (tmp.length > 10) {
        tmp = tmp.replace(/([0-9]{3})\.([0-9]{3}),([0-9]{2})$/g, '.$1.$2,$3');
    }

    if (tmp.length > 14) {
        tmp = tmp.replace(/([0-9]{3})\.([0-9]{3})\.([0-9]{3}),([0-9]{2})$/g, '.$1.$2.$3,$4');
    }
    
    return `R$ ${tmp}`;
};
export default toBRL