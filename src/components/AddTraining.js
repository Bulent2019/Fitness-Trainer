import React, {useState} from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';

function AddTraining (props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: ''
    });

    //Trainings icon
    const useStyles = makeStyles((theme) => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }));
     const classes = useStyles();

    const handleClickOpen = () => {
        setTraining({
            date: '',
            duration: '',
            activity: '',
            customer: props.params.data.links[0].href,
        })
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    const handleSave = () => {
        props.addTraining(training);
        handleClose();
    }

    const inputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    return(
        <div>
            <IconButton>
                <FitnessCenterIcon color="primary" fontSize="small" onClick={handleClickOpen}>
                    
                </FitnessCenterIcon>
            </IconButton>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        name="date"
                        value={training.date}
                        onChange={inputChange}
                        margin="dense"
                        fullWidth
                        id="datetime-local"
                        type="datetime-local"
                        defaultValue="2020-12-01T12:00"
                        className={classes.textField}
                         // InputLabelProps={{
                        // shrink: true
                        // }}
                    />
                    <TextField
                        name="duration"
                        value={training.duration}
                        onChange={inputChange}
                        margin="dense"
                        label="Duration / min"
                        fullWidth
                    />
                    <TextField
                        name="activity"
                        value={training.activity}
                        onChange={inputChange}
                        margin="dense"
                        label="Activity"
                        fullWidth
                    />
                    {/* <TextField
                        name="customer"
                        value={training.customer}
                        onChange={inputChange}
                        margin="dense"
                        label="Customer"
                        fullWidth
                    /> */}
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

export default AddTraining;


