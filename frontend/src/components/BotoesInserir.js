import { Button, ButtonGroup } from "@mui/material";
import DialogForm from "./Dialog";
import { useState } from "react";

// import react
import React from "react";

export default function BotoesInserir({ adicionarTransacao }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Create a reference to the hidden file input element
    const hiddenFileInput = React.useRef(null);

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        console.log(fileUploaded);
    };
    return (
        <div>
            <p>Registre suas transações</p>
            <ButtonGroup
                variant="outlined"
                fullWidth
                aria-label="outlined button group"
            >
                <Button>Fatura</Button>

                <Button onClick={handleClickOpen}>Manualmente</Button>
                <DialogForm
                    open={open}
                    handleClose={handleClose}
                    adicionarTransacao={adicionarTransacao}
                />
                <>
                    <Button onClick={handleClick}>Extrato</Button>
                    <input
                        type="file"
                        ref={hiddenFileInput}
                        accept=".pdf"
                        onChange={handleChange}
                        style={{ display: "none" }}
                    />
                </>
            </ButtonGroup>
        </div>
    );
}
