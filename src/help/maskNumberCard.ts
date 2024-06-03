const maskNumberCard = (numberCard: string): string => {
    if (typeof numberCard !== 'string' || numberCard === '') {
        return '';
    }

    // Remover quaisquer espaços que já possam existir
    const cleaned = numberCard.replace(/\s+/g, '');

    // Adicionar espaços a cada 4 dígitos
    const masked = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');

    return masked;
};

export default maskNumberCard;
