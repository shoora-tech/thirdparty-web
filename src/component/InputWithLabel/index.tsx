import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

export default function InputWithLabel() {
    return (
        <Box sx={{
            py: 2,
            px: 2
        }}>
            <InputLabel htmlFor="input1">Date Input</InputLabel>
            <TextField
                id="date"
                size="small"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Box>
    )
}