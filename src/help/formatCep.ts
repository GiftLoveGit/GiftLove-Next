const maskCEP = (cep: string) => {
    if (typeof cep !== 'string' || cep === '') {
        return '';
    }
    cep = cep.replace(/\D/g, '')
    cep = cep.replace(/(\d{5})(\d)/, '$1-$2')  
    return cep
}

export default maskCEP;