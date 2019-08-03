import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

export default class Index extends React.Component {

    render() {
        return (
            <div style={{marginTop: 20}}>
                <Paper style={{padding: 10}}>
                    <h3>Insert a new Item</h3>
                    <Grid container spacing={2}>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                label={"Barcode"}
                                fullWidth
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                label={"Brand"}
                                fullWidth
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                label={"Price"}
                                fullWidth
                                variant={"outlined"}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                id="date"
                                label="Expiry Date"
                                type="date"
                                defaultValue="2020-01-01"
                                variant={"outlined"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                id="date"
                                label="Manufacture Date"
                                type="date"
                                defaultValue="2020-01-01"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                label={"Materials"}
                                fullWidth
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                label={"How to use"}
                                multiline
                                fullWidth
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                label={"Company"}
                                fullWidth
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                label={"Nutritional values"}
                                fullWidth
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                label={"What are the uses"}
                                multiline
                                fullWidth
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                label={"About the Healthy"}
                                fullWidth
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                label={"Health & Safety Instructions"}
                                fullWidth
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                label={"Telephone Numbers"}
                                fullWidth
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                label={"How to store"}
                                fullWidth
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                label={"Product Number & Batch Number"}
                                fullWidth
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                label={"Category of Product type"}
                                fullWidth
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item xs={12} style={{textAlign: "right"}}>
                            <Button
                                variant="contained"
                                color={"primary"}>
                                <SaveIcon/>
                                Save to database
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }

}