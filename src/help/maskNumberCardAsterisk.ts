const maskNumberCardAsterisk = (numberCard: string): string => {
    if (typeof numberCard !== 'string' || numberCard === '') {
        return '';
    }

    // Manter apenas os últimos 4 dígitos visíveis
    const visibleDigits = numberCard.slice(-4);
    // Substituir os dígitos anteriores por asteriscos
    const maskedDigits = numberCard.slice(0, -4).replace(/\d/g, '*');

    // Retornar o número de cartão mascarado
    return maskedDigits + visibleDigits;
};

export default maskNumberCardAsterisk;