"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Swal from 'sweetalert2';

type HTMLFormProps = React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
>;
// interface ValidationError {
//     code: string;
//     description: string;
// }
// interface Success {
//     code: string;    
// }
type FormProps = PropsWithChildren<
    Omit<HTMLFormProps, "action"> & {
        action: (prevState: any, formData: FormData) => Promise<any>;
        // setErrors: React.Dispatch<React.SetStateAction<ValidationError[]>>;
        // setSuccess: React.Dispatch<React.SetStateAction<Success[]>>;
    }
>;

export function Form({ action, ...props }: FormProps) {
    const [state, formAction] = useFormState(action, { error: null, success: null, errors: null });
    // console.log('state', state)
    // useEffect(() => {
    //     if (state.errors) {
    //         setErrors(state.errors);
    //     }
    // }, [state.errors, setErrors]);
    // useEffect(() => {
    //     if (state.success) {
    //         setSuccess(state.success)
    //     }
    // }, [state.success, setSuccess]);
    return (
        <form {...props} action={formAction}>
            {props.children}
        </form>
    );
}