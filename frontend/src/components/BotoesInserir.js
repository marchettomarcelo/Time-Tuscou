import { Button, ButtonGroup } from "@mui/material";
import DialogForm from "./Dialog";
import { useState } from "react";
import useAxios from "../utils/useAxios";

// import react
import React from "react";
import axios from "axios";

export default function BotoesInserir({ adicionarTransacao }) {
    const [open, setOpen] = React.useState(false);
    const api = useAxios();

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
    const handleChange = async (event) => {
        const fileUploaded = event.target.files[0];

        const formData = new FormData();

        formData.append("File", fileUploaded);

        const response = await api.post("/extrato/", fileUploaded);

        console.log(response);
    };

    return (
        <div>
            <p>Registre suas transações</p>
            <ButtonGroup
                variant="outlined"
                fullWidth
                aria-label="outlined button group"
            >
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
                        // accept jpg, png, pdf
                        accept=".jpeg,"
                        onChange={handleChange}
                        style={{ display: "none" }}
                    />
                </>
            </ButtonGroup>
        </div>
    );
}
