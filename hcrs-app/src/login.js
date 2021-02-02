import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { firebase } from "./firebase/config";
import Box from '@material-ui/core/Box';
import { AuthContext } from "./context"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import './styles/mainstyles.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Hyped Cartel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "rgba(38, 39, 44, 0.959)",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: "#ffffff",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#ffffff",
  },
}));

export default function SignIn() {
  const Auth = React.useContext(AuthContext);
  const classes = useStyles();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const handleSignIn = (event) => {
    event.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        console.log("Working")
        console.log(userCredential.user)
        if (userCredential.user) Auth.setLoggedIn(true);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      });
  }

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  if (Auth.isLoggedIn) {
    return <Redirect to={{ pathname: "/home", state: { loggedIn: true } }} />
  }

  return (
    <div className="mainContainer" width="100%" height="100%">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography style={{color: "#ffffff"}} component="h1" variant="h5">
            Sign in
        </Typography>
          <form onSubmit={handleSignIn} className={classes.form}>
            <TextField
              onChange={handleEmail}
              variant="outlined"
              margin="normal"
              color="secondary"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={handlePassword}
              variant="outlined"
              margin="normal"
              color="secondary"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              color="secondary"
              fullWidth
              variant="contained"
              className={classes.submit}
              onSubmit={handleSignIn}
            >
              Sign In
          </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}