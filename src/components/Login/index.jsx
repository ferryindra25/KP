import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(/wallpaper/wallpaper.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const history = useHistory();
    const onSubmitLogin = (e) =>{
        e.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        axios.post("/api/login", {
            email : email,
            password : password
        }).then(function (response) {
            //console.log(response.data);
            if (response.status == 200){
                //console.log(response.data);
                var namaCustomer = response.data.data[0].nama_customer;
                var alamatCustomer = response.data.data[0].alamat_customer;
                var telpCustomer = response.data.data[0].telp_customer;
                var token = response.data.token;
                window.sessionStorage.setItem("email", email);
                window.sessionStorage.setItem("nama", namaCustomer);
                window.sessionStorage.setItem("alamat", alamatCustomer);
                window.sessionStorage.setItem("telp", telpCustomer);
                window.sessionStorage.setItem("token", token);
                alert("anda berhasil login")
                history.push("/");
            } else if (response.status == 400){
                alert("Email/password anda salah.");
            }
        }).catch(function (error){
            alert("Email/password anda salah");
        })

    }
    const classes = useStyles();
    return (
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={(e) => onSubmitLogin(e)}>
                <input type="email" name="email" id="email" className="form-control mt-3" placeholder="Email Address"/>
                <input type="password" name="password" id="password" className="form-control mt-3" placeholder="Password"/>
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item>
                        <Link href="register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            
            </form>
        </div>
        </Grid>
    </Grid>
    )
}
export default Login;