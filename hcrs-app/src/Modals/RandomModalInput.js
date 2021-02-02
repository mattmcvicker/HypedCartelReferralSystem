import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Button } from '@material-ui/core';
import { firebase } from "../firebase/config";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function RandomModalInput(props) {
    const [one, setOne] = React.useState();
    const [two, setTwo] = React.useState();
    const [three, setThree] = React.useState();
    const [four, setFour] = React.useState();
    const [five, setFive] = React.useState();

    const classes = useStyles();

    const handleOne = (event) => {
        setOne(event.target.value);
    };
    const handleTwo = (event) => {
        setTwo(event.target.value);
    };
    const handleThree = (event) => {
        setThree(event.target.value);
    };
    const handleFour = (event) => {
        setFour(event.target.value);
    };
    const handleFive = (event) => {
        setFive(event.target.value);
    };

    const startCycle = () => {
        var objData = [];
        objData.push(
            {
                email: props.randomMembers[0].email,
                user: props.randomMembers[0].name,
                code: one
            }
        );
        objData.push(
            {
                email: props.randomMembers[1].email,
                user: props.randomMembers[1].name,
                code: two
            }
        )
        objData.push(
            {
                email: props.randomMembers[2].email,
                user: props.randomMembers[2].name,
                code: three
            }
        )
        objData.push(
            {
                email: props.randomMembers[3].email,
                user: props.randomMembers[3].name,
                code: four
            }
        )
        objData.push(
            {
                email: props.randomMembers[4].email,
                user: props.randomMembers[4].name,
                code: five
            }
        )
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '|' + dd + '|' + yyyy;
        var database = firebase.database();
        database.ref('cycle/' + today).set({
            startDate: today,
            dataSubmitted: objData
        })
        alert("Cycle started! Start Date: " + today)
    }

    return (
        <div style={{display: 'flex', flexDirection: "column"}}>
            <form className={classes.root} noValidate autoComplete="off">
                <FormControl>
                    <InputLabel htmlFor="component-simple">Referral Code 1</InputLabel>
                    <Input id="component-simple" value={one} onChange={handleOne} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="component-simple">Referral Code 2</InputLabel>
                    <Input id="component-simple" value={two} onChange={handleTwo} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="component-simple">Referral Code 3</InputLabel>
                    <Input id="component-simple" value={three} onChange={handleThree} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="component-simple">Referral Code 4</InputLabel>
                    <Input id="component-simple" value={four} onChange={handleFour} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="component-simple">Referral Code 5</InputLabel>
                    <Input id="component-simple" value={five} onChange={handleFive} />
                </FormControl>
            </form>
            <Button variant="contained" color="secondary" onClick={startCycle}>Start Cycle</Button>
        </div>
    );
}
