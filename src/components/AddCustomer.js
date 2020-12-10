import React, {useState} from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddCustomer (props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    const handleSave = () => {
        props.addCustomer(customer);
        handleClose();
    }

    const inputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    return(
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Customer
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        name="firstname"
                        value={customer.firstname}
                        onChange={inputChange}
                        margin="dense"
                        label="Firstname"
                        fullWidth
                    />
                    <TextField
                        name="lastname"
                        value={customer.lastname}
                        onChange={inputChange}
                        margin="dense"
                        label="Lastname"
                        fullWidth
                    />
                    <TextField
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={inputChange}
                        margin="dense"
                        label="Streetaddress"
                        fullWidth
                    />
                    <TextField
                        name="postcode"
                        value={customer.postcode}
                        onChange={inputChange}
                        margin="dense"
                        label="Postcode"
                        fullWidth
                    />
                    <TextField
                        name="city"
                        value={customer.city}
                        onChange={inputChange}
                        margin="dense"
                        label="City"
                        fullWidth
                    />
                    <TextField
                        name="email"
                        value={customer.email}
                        onChange={inputChange}
                        margin="dense"
                        label="Email"
                        fullWidth
                    />
                    <TextField
                        name="phone"
                        value={customer.phone}
                        onChange={inputChange}
                        margin="dense"
                        label="Phone"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddCustomer;


//  last recording 1:03:00