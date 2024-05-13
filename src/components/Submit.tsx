"use client";

import { useFormStatus } from "react-dom";
import Button from 'react-bootstrap/Button';
import { Icons } from "@/components/icons";

type SubmitProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export function Submit(props: SubmitProps) {
    const {disabled, ...otherProps } = props;
    const status =  useFormStatus();
    return (
    <Button  variant="primary"
    {...otherProps} 
    ref={null}
    disabled={status.pending || disabled}
    >
        {status.pending ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                otherProps.children
            )}
    </Button> 
    )
}