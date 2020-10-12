import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));




const Register = () => {

    const classes = useStyles();
    const history = useHistory();
    const useFormInput = (initialvalue) => {
        const [value, setValue] = useState(initialvalue);
        const handleChange = (e) => {
            setValue(e.target.value);
        };
        return { value, onChange: handleChange };
    };

    const email = useFormInput("");
    const nama = useFormInput("");
    const alamat = useFormInput("");
    const telp = useFormInput("");
    const password = useFormInput("");

    const varRegis = {
        email    : email.value,
        nama     : nama.value,
        alamat   : alamat.value,
        telp     : telp.value,
        password : password.value
    };

    const onSubmitRegister = async (e, regis) => {
        e.preventDefault();
        if (regis.email === "" || regis.nama === "" || regis.alamat === "" || regis.telp === "" || regis.password === ""){
            alert("Pastikan semua field sudah terisi");
        } else {
            try {
                const res = await fetch("/api/registerCustomer", {
                    method: "POST",
                    headers: { "content-Type": "application/json" },
                    body: JSON.stringify(regis),
                });
                if (res.status === 400){
                    alert("email sudah terpakai");
                } else {
                    alert("berhasil register");
                    
                    history.push("/login");
                    
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-3" style={{marginLeft : "auto", marginRight : "auto"}}>
                    <Avatar className={classes.avatar} style={{marginLeft : "auto", marginRight : "auto"}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{textAlign : "center"}}>
                        Sign up
                    </Typography>
                    <form onSubmit={(e) => onSubmitRegister(e, varRegis)}>
                        <input type="email" name="email" id="email" placeholder="Email" className="form-control mt-3" value={email.value} onChange={email.onChange}/>
                        <input type="text" name="name" id="name" placeholder="Name" className="form-control mt-2" value={nama.value} onChange={nama.onChange}/>
                        <input type="text" name="address" id="address" placeholder="Address" className="form-control mt-2" value={alamat.value} onChange={alamat.onChange}/>
                        <input type="text" name="telp" id="telp" placeholder="Telephone Number" className="form-control mt-2" value={telp.value} onChange={telp.onChange}/>
                        <input type="password" name="password" id="password" placeholder="Password" className="form-control mt-2" value={password.value} onChange={password.onChange}/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="mt-2"
                        >
                            Sign UP
                        </Button>
                    </form>
                </div>
            </div>
            
        </div>
    );
}

export default Register;