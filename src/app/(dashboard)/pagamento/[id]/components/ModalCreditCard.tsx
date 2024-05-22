'use client'
import { Form } from "@/components/Form";
import React, { useState, FocusEvent, ChangeEvent, Dispatch, SetStateAction, useEffect, PropsWithChildren } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { purchasePayment, redirectEnviados } from '../../payments';
import BRL from '@/help/getFormatCurrency';
import { Submit } from "@/components/Submit";
import maskCEP from "@/help/formatCep";
import formatPhone from "@/help/formatPhone";
import maskNumberCard from "@/help/maskNumberCard";
import maskCpfCnpj from "@/help/formatCpfCnpj";
import { Form as BootstrapForm, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useFormState } from "react-dom";

// import { redirect } from 'next/navigation'

interface ModalCreditCardProps {
    price: string;
    feesPayment: string;
    purchase_id: string;
}
interface formCrediCardProps {
    name: string;
    cpfCnpj: string;
    email: string;
    postalCode: string;
    logradouro: string;
    addressNumber: string;
    phone: string;
    number_credit: string;
    holder_name: string;
    expiration_month: string;
    expiration_year: string;
    cvv: string;
}
interface ValidationError {
    code: string;
    description: string;
}
interface Success {
    code: string;
}
type HTMLFormProps = React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
>;
type FormProps = PropsWithChildren<
    Omit<HTMLFormProps, "action"> & {
        action: (prevState: any, formData: FormData) => Promise<any>;
        setErrors: React.Dispatch<React.SetStateAction<ValidationError[]>>;
        setSuccess: React.Dispatch<React.SetStateAction<Success[]>>;
    }
>;

export default function ModalCreditCard({
    price,
    feesPayment,
    purchase_id
}: ModalCreditCardProps) {
    const validPrice = typeof price === 'number' ? price : parseFloat(price as string) || 0;
    const validTaxa = typeof feesPayment === 'number' ? feesPayment : parseFloat(feesPayment as string) || 0;
    const total = validPrice + validTaxa;

    const [formData, setFormData] = useState<formCrediCardProps>({
        name: "",
        cpfCnpj: "",
        email: "",
        postalCode: "",
        logradouro: "",
        addressNumber: "",
        phone: "",
        number_credit: "",
        holder_name: "",
        expiration_month: "",
        expiration_year: "",
        cvv: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const formattedPrice = BRL(validPrice);
    const formattedTaxa = BRL(validTaxa);
    const formattedTotal = BRL(total);
    const [show, setShow] = useState(false);

    const [errorsValidate, setErrorsValidate] = useState<ValidationError[]>([]);
    const [success, setSuccess] = useState<Success[]>([]);

    

    const getErrorForField = (fieldName: string) => {
        const error = errorsValidate.find(error => error.description.toLowerCase().includes(fieldName.toLowerCase()));
        return error ? error.description : '';
    };

    const hasError = (fieldName: string) => {
        return errorsValidate.some(error => error.description.toLowerCase().includes(fieldName.toLowerCase()));
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleBuscaCep = async (event: FocusEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const cep = value;
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json`, {
                cache: 'no-store',
            });
            const data = await response.json();
            setFormData({
                ...formData,
                logradouro: data.logradouro,
            });
        } catch (err) {
            console.error(err);
        }
    };
    const [state, formAction] = useFormState(purchasePayment, { error: null, success: null, errors: null, data: null });
    useEffect(() => {
        if (state.status === 'CONFIRMED') {
            Swal.fire({
                title: 'Sucesso',
                text: 'Sua compra foi aprovada!',
                icon: 'success',                
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('Usuário clicou em OK');
                    redirectEnviados(true)
                }
            });
        }
    }, [state]);
    useEffect(() => {
        if (state.errors) {
            setErrorsValidate(state.errors);
        }
    }, [state.errors, setErrorsValidate]);
    useEffect(() => {
        const error = errorsValidate.find(error => error.code === 'invalid_action');
        if (error) {
            Swal.fire('Erro', error.description, 'error');
        }
    }, [errorsValidate]);
    return (
        <>
            <Button className="w-100 btn btn-blue" onClick={handleShow}>
                Cartão de Crédito
            </Button>
            <Modal
                show={show}
                size="xl"
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <section>
                        <div className="row">
                            <div className="col-md-8 mb-4">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="mb-0">Informações de cobrança</h5>
                                    </div>
                                    <div className="card-body">
                                    {/* <form {...props} action={formAction}> setErrors={setErrorsValidate} setSuccess={setSuccess}*/}
                                        <form  action={formAction} >
                                            <input type="hidden" name="purchase_id" value={purchase_id} />
                                            <div className="row mb-4">
                                                <div className="col">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1">Nome completo do titular do cartão</label>
                                                        <BootstrapForm.Control
                                                            type="text" name="name"
                                                            id="form6Example1"
                                                            className="form-control"
                                                            onChange={handleChange}
                                                            value={formData.name}
                                                            isInvalid={hasError('nome do titular do cartão')}

                                                        />
                                                        <BootstrapForm.Control.Feedback type="invalid">
                                                            {getErrorForField('nome do titular do cartão')}
                                                        </BootstrapForm.Control.Feedback>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form6Example5">Email</label>
                                                <BootstrapForm.Control
                                                    type="email"
                                                    name="email"
                                                    id="form6Example5"
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={formData.email}
                                                    isInvalid={hasError('email do titular do cartão')}
                                                    required
                                                />
                                                <BootstrapForm.Control.Feedback type="invalid">
                                                    {getErrorForField('email do titular do cartão')}
                                                </BootstrapForm.Control.Feedback>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form6Example3">CPF/CNPJ</label>
                                                <BootstrapForm.Control
                                                    type="text"
                                                    name="cpfCnpj"
                                                    id="form6Example3"
                                                    className="form-control"
                                                    maxLength={18}
                                                    onChange={handleChange}
                                                    value={maskCpfCnpj(formData.cpfCnpj ?? '')}
                                                    isInvalid={hasError('CPF ou CNPJ')}
                                                    required
                                                />
                                                <BootstrapForm.Control.Feedback type="invalid">
                                                    {getErrorForField('CPF ou CNPJ')}
                                                </BootstrapForm.Control.Feedback>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form6Example4">CEP</label>
                                                <BootstrapForm.Control
                                                    type="text"
                                                    name="postalCode"
                                                    id="form6Example4"
                                                    className="form-control"
                                                    maxLength={9}
                                                    onChange={handleChange}
                                                    onBlur={handleBuscaCep}
                                                    value={maskCEP(formData.postalCode ?? '')}
                                                    isInvalid={hasError('CEP')}
                                                    required
                                                />
                                                <BootstrapForm.Control.Feedback type="invalid">
                                                    {getErrorForField('CEP')}
                                                </BootstrapForm.Control.Feedback>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form6Example4">Endereço de cobrança</label>
                                                <BootstrapForm.Control
                                                    type="text"
                                                    id="form6Example4"
                                                    className="form-control"
                                                    name="logradouro"
                                                    onChange={handleChange}
                                                    value={formData.logradouro}
                                                    isInvalid={hasError('logradouro')}
                                                    required
                                                />
                                                <BootstrapForm.Control.Feedback type="invalid">
                                                    {getErrorForField('logradouro')}
                                                </BootstrapForm.Control.Feedback>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <label className="form-label" htmlFor="formNameOnCard">Número do endereço</label>
                                                        <BootstrapForm.Control
                                                            type="text"
                                                            id="formNameOnCard"
                                                            name="addressNumber"
                                                            className="form-control"
                                                            onChange={handleChange}
                                                            value={formData.addressNumber}
                                                            isInvalid={hasError('número do endereço')}
                                                            required
                                                        />
                                                        <BootstrapForm.Control.Feedback type="invalid">
                                                            {getErrorForField('número do endereço')}
                                                        </BootstrapForm.Control.Feedback>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <label className="form-label" htmlFor="formCardNumber">Telefone</label>
                                                        <BootstrapForm.Control
                                                            type="text"
                                                            id="formCardNumber"
                                                            name="phone"
                                                            className="form-control"
                                                            onChange={handleChange}
                                                            maxLength={15}
                                                            value={formatPhone(formData.phone ?? '')}
                                                            isInvalid={hasError('DDD')}
                                                            required
                                                        />
                                                        <BootstrapForm.Control.Feedback type="invalid">
                                                            {getErrorForField('DDD')}
                                                        </BootstrapForm.Control.Feedback>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="my-4" />

                                            <h5 className="mb-4">Dados do cartão</h5>

                                            <div className="row mb-4">
                                                <div className="col">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <label className="form-label" htmlFor="formNameOnCard">Nome que está impresso no cartão</label>
                                                        <BootstrapForm.Control
                                                            type="text"
                                                            id="formNameOnCard"
                                                            className="form-control"
                                                            name="holder_name"
                                                            onChange={handleChange}
                                                            value={formData.holder_name}
                                                            isInvalid={hasError('nome do portador')}
                                                            required
                                                        />
                                                        <BootstrapForm.Control.Feedback type="invalid">
                                                            {getErrorForField('nome do portador')}
                                                        </BootstrapForm.Control.Feedback>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <label className="form-label" htmlFor="formCardNumber">Número do cartão</label>
                                                        <BootstrapForm.Control
                                                            type="text"
                                                            id="formCardNumber"
                                                            className="form-control"
                                                            name="number_credit"
                                                            maxLength={19}
                                                            onChange={handleChange}
                                                            value={maskNumberCard(formData.number_credit ?? '')}
                                                            isInvalid={hasError('número do seu cartão') || hasError('número do cartão é inválido')}
                                                            required
                                                        />
                                                        <BootstrapForm.Control.Feedback type="invalid">
                                                            {getErrorForField('número do seu cartão')}
                                                            {getErrorForField('número do cartão é inválido')}
                                                        </BootstrapForm.Control.Feedback>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-3">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <label className="form-label" htmlFor="formExpiration">Mês de expiração</label>
                                                        <BootstrapForm.Control
                                                            type="text"
                                                            id="formExpiration"
                                                            className="form-control"
                                                            name="expiration_month"
                                                            maxLength={2}
                                                            onChange={handleChange}
                                                            value={formData.expiration_month}
                                                            isInvalid={hasError('mês de vencimento')}
                                                            required
                                                        />
                                                        <BootstrapForm.Control.Feedback type="invalid">
                                                            {getErrorForField('mês de vencimento')}
                                                        </BootstrapForm.Control.Feedback>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <label className="form-label" htmlFor="formExpiration">Ano de expiração</label>
                                                        <BootstrapForm.Control
                                                            type="text"
                                                            id="formExpiration"
                                                            className="form-control"
                                                            name="expiration_year"
                                                            maxLength={4}
                                                            onChange={handleChange}
                                                            value={formData.expiration_year}
                                                            isInvalid={hasError('ano de vencimento') || hasError('expirado')}
                                                            required
                                                        />
                                                        <BootstrapForm.Control.Feedback type="invalid">
                                                            {getErrorForField('ano de vencimento')}
                                                            {getErrorForField('expirado')}
                                                        </BootstrapForm.Control.Feedback>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <label className="form-label" htmlFor="formCVV">CVV</label>
                                                        <BootstrapForm.Control
                                                            type="text"
                                                            id="formCVV"
                                                            className="form-control"
                                                            name="cvv"
                                                            maxLength={3}
                                                            onChange={handleChange}
                                                            value={formData.cvv}
                                                            isInvalid={hasError('código de segurança')}
                                                            required
                                                        />
                                                        <BootstrapForm.Control.Feedback type="invalid">
                                                            {getErrorForField('código de segurança')}
                                                        </BootstrapForm.Control.Feedback>
                                                    </div>
                                                </div>
                                            </div>
                                            <Submit type="submit" className="w-100 btn btn-blue">
                                                Comprar
                                            </Submit>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="mb-0">Resumo</h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Cartão de presente
                                                <span>{formattedPrice}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                Taxa
                                                <span>{formattedTaxa}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div>
                                                    <strong>Total da compra</strong>
                                                    <strong>
                                                        <p className="mb-0">(Incluindo taxas)</p>
                                                    </strong>
                                                </div>
                                                <span><strong>{formattedTotal}</strong></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}