'use client'
import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

interface PayloadInterface {
    payload: string;
}

const CopyButton: React.FC<PayloadInterface> = ({ payload }) => {
    const [copySuccess, setCopySuccess] = useState<string>('');

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(payload);
            setCopySuccess('PIX copiar e colar copiado com sucesso!');
        } catch (err) {
            setCopySuccess('Falha ao copiar o PIX copiar e colar.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <InputGroup className="mb-3" style={{ maxWidth: '500px' }}>
                <Form.Control value={payload} readOnly />
                <Button variant="primary" onClick={copyToClipboard}>Copiar Texto</Button>
            </InputGroup>
            {copySuccess && <p className="text-success">{copySuccess}</p>}
        </div>
    );
};

export default CopyButton;
