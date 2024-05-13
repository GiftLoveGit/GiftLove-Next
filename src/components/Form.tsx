"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import { useFormState } from "react-dom";
// import Swal from 'sweetalert2'

type HTMLFormProps = React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
>;
type FormProps = PropsWithChildren<
    Omit<HTMLFormProps, "action"> & {
        action: (prevState: any, formData: FormData) => Promise<any>;
    }
>;

export function Form(props: FormProps) {
    const [state, formAction] = useFormState(props.action, { error: null, success: null, errors: null })
    console.log(state)
    // const [toastVisible, setToastVisible] = useState<boolean>(false);
    // useEffect(() => {
    //     // console.log('ok')
    //     if (state.success !== null) {
    //         setToastVisible((prevVisible) => !prevVisible);
    //     }
    // }, [!state.success]);
    // const handleClose = () => {
    //     setToastVisible((prevVisible) => !prevVisible);
    // };
    return (
        <form {...props} action={formAction}>
            {state.error && (
                <div className="bg-danger text-white text-center p-3 mt-3">
                    <strong>Erro:</strong> {state.error}
                </div>
            )}
            {state.errors && (
                <div className="bg-danger text-white text-center p-3 mt-3">
                    {Object.keys(state.errors).map((key, index) => (
                        <p key={index}>{state.errors[key][0]}</p>
                    ))}
                </div>
            )}
            {state.success && (
                <div className="bg-danger text-white text-center p-3 mt-3">
                    <strong>Erro:</strong> {state.error}
                </div>
            )}
            {/* {state.success !== null && toastVisible && (
                <div id="toast-default" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg border-2 border-green-500 shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                    <div className=" inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span className="sr-only">Check icon</span>
                    </div>
                    <div className="ms-3 text-sm font-normal text-green-500">{state.success}</div>
                    <button type="button" onClick={handleClose} className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
            )} */}
            {props.children}
        </form>
    );
}