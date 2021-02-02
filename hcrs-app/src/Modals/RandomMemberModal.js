import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import RandomModalInput from "./RandomModalInput"

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: "50%",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function RandomMemberModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    var count = 0;
    const randomUsers = props.randomMembers.map((data) => {
        count++;
        return (
            <div>
                <h4 style={{color: "#f50057", fontStyle: "italic"}}>User {count}: {data.name}</h4>
                <h4 style={{color: "#f50057", fontStyle: "italic"}}>Email: {data.email}</h4>
            &nbsp;
            </div>
        )
    })

    const handleOpen = () => {
        setOpen(true);
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            { randomUsers}
            <RandomModalInput randomMembers={props.randomMembers}></RandomModalInput>
        </div>
    );

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleOpen}>Choose 5 Random Active Members</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
