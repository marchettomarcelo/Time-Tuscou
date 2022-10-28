import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function DialogForm({ open, handleClose, adicionarTransacao }) {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");

    // useEffect(() => {
    //     if (meses) {
    //         setMes(meses[0]);
    //     }
    // }, [meses]);

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const closeAndAdd = () => {
        adicionarTransacao({
            amount,
            description,
            date,
            category,
        });
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            style={{ borderRadius: "20px", gap: "1rem" }}
        >
            <DialogTitle>Insira as informações de uma transação</DialogTitle>
            <DialogContent style={{ gap: "1rem" }}>
                {/* <DialogContentText>
                    To subscribe to this website, please enter your email
                    address here. We will send updates occasionally.
                </DialogContentText> */}
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Descrição da transação"
                    type="text"
                    fullWidth
                    value={description}
                    onChange={handleDescriptionChange}
                    variant="standard"
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="valor"
                    label="Valor da transação"
                    type="number"
                    fullWidth
                    value={amount}
                    onChange={handleAmountChange}
                    variant="standard"
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="data"
                    type="date"
                    fullWidth
                    value={date}
                    onChange={handleDateChange}
                    variant="standard"
                />

                <FormControl sx={{ mt: 2 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Categoria
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        label="Categoria"
                        id="demo-simple-select"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        {[
                            "ENTRETENIMENTO",
                            "ALIMENTAÇÃO",
                            "TRANSPORTE",
                            "SAÚDE",
                            "EDUCAÇÃO",
                            "OUTROS",
                        ].map((categoria, id) => {
                            return (
                                <MenuItem key={id} value={categoria}>
                                    {categoria}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={closeAndAdd}>Adicionar</Button>
            </DialogActions>
        </Dialog>
    );
}
