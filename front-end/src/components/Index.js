import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import firebase from './../config/firebase';
import '@firebase/firestore'
import ChipInput from "material-ui-chip-input";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";

const INITIAL_STATE = {
    barcode: '',
    itemName: '',
    brand: '',
    price: '',
    expiryDate: '2020-01-01',
    manufactureDate: '2020-01-01',
    materials: [],
    howToUse: '',
    company: '',
    nutritionalValues: '',
    whatAreTheUses: '',
    aboutTheHealthy: '',
    telephoneNumbers: '',
    howToStore: '',
    productNumberAndBatchNumber: '',
    categoryOfProductType: '',
    healthAndSafetyInstructions: '',
    open: false,
};

export default class Index extends React.Component {

    state = INITIAL_STATE;

    onClickSave = event => {
        this.setState({ open: true });
        const item = this.state;
        delete item.open;
        const db = firebase.firestore();
        db.collection("items").add(item).then(() => {
            this.setState({ open: false });
            this.setState({ INITIAL_STATE });
        });
    };

    onTextChange = event => this.setState({ [event.target.name]: event.target.value });

    onTextNumberChange = event => {
        if (!event.target.value.match(/^\d*\.?\d{0,2}$/)) return;
        this.setState({ [event.target.name]: event.target.value });
    };

    onAddChip = chip => this.state.materials.push(chip);

    onDeleteChip = (chip, index) =>
        this.setState({ materials: this.state.materials.filter(item => item !== chip) });

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <Dialog open={this.state.open}>
                    <DialogTitle>
                        Saving to Database...
                    </DialogTitle>
                    <DialogContent style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </DialogContent>
                </Dialog>
                <Paper style={{ padding: 10 }}>
                    <h3>Insert a new Item</h3>
                    <Grid container spacing={2}>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                label={"Barcode"}
                                fullWidth
                                variant={"outlined"}
                                name='barcode'
                                value={this.state.barcode}
                                onChange={this.onTextChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                label={"Item Name"}
                                fullWidth
                                variant={"outlined"}
                                name='itemName'
                                value={this.state.itemName}
                                onChange={this.onTextChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                label={"Brand"}
                                fullWidth
                                variant={"outlined"}
                                name='brand'
                                value={this.state.brand}
                                onChange={this.onTextChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                label={"Price"}
                                fullWidth
                                variant={"outlined"}
                                type='numbers'
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                                }}
                                name='price'
                                value={this.state.price}
                                onChange={this.onTextNumberChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                id="date"
                                label="Expiry Date"
                                type="date"
                                variant={"outlined"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                name='expiryDate'
                                value={this.state.expiryDate}
                                onChange={this.onTextChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                id="date"
                                label="Manufacture Date"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                variant={"outlined"}
                                name='manufactureDate'
                                value={this.state.manufactureDate}
                                onChange={this.onTextChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <ChipInput
                                required
                                value={this.state.materials}
                                fullWidth
                                label='Materials'
                                variant={"outlined"}
                                onAdd={this.onAddChip}
                                onDelete={this.onDeleteChip}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                label={"How to use"}
                                multiline
                                fullWidth
                                variant={"outlined"}
                                name='howToUse'
                                value={this.state.howToUse}
                                onChange={this.onTextChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                label={"Company"}
                                fullWidth
                                variant={"outlined"}
                                name='company'
                                value={this.state.company}
                                onChange={this.onTextChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                label={"Nutritional values"}
                                fullWidth
                                variant={"outlined"}
                                name='nutritionalValues'
                                value={this.state.nutritionalValues}
                                onChange={this.onTextChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                label={"What are the uses"}
                                multiline
                                fullWidth
                                variant={"outlined"}
                                name='whatAreTheUses'
                                value={this.state.whatAreTheUses}
                                onChange={this.onTextChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                label={"About the Healthy"}
                                fullWidth
                                variant={"outlined"}
                                name='aboutTheHealthy'
                                value={this.state.aboutTheHealthy}
                                onChange={this.onTextChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                label={"Health & Safety Instructions"}
                                fullWidth
                                variant={"outlined"}
                                name='healthAndSafetyInstructions'
                                value={this.state.healthAndSafetyInstructions}
                                onChange={this.onTextChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                label={"Telephone Numbers"}
                                fullWidth
                                variant={"outlined"}
                                name='telephoneNumbers'
                                value={this.state.telephoneNumbers}
                                onChange={this.onTextChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                label={"How to store"}
                                fullWidth
                                multiline
                                variant={"outlined"}
                                name='howToStore'
                                value={this.state.howToStore}
                                onChange={this.onTextChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                label={"Product Number & Batch Number"}
                                fullWidth
                                variant={"outlined"}
                                name='productNumberAndBatchNumber'
                                value={this.state.productNumberAndBatchNumber}
                                onChange={this.onTextChange}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} lg={6}>
                            <TextField
                                required
                                label={"Category of Product type"}
                                fullWidth
                                variant={"outlined"}
                                name='categoryOfProductType'
                                value={this.state.categoryOfProductType}
                                onChange={this.onTextChange}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "right" }}>
                            <Button
                                variant="contained"
                                color={"primary"}
                                onClick={this.onClickSave}>
                                <SaveIcon />
                                Save to database
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }

}