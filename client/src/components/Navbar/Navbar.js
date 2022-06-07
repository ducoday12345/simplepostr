import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography  } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'; 

import useStyles from './styles';
import SLogo from '../../images/S.png';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        navigate('/');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        };

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    

    return(
        <AppBar className={classes.appBar} position="static" color="inherit" >
            <div className={classes.brandContainer}>       
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Simplepostr</Typography>
                <img className={classes.image} src={SLogo} alt="icon" height="40px"/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user?.result ? ( 
                    <div className={classes.profile}>
                        <Avatar  className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{"user?.result.name".charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        {/* <Button variant="contained" className={classes.logout} style={{backgroundColor: "#4682B4",fontSize: "18px",borderRadius:35, color: 'white'}} onClick={logout}>Logout</Button> */}
                        <Button variant="contained" className={classes.logout} class="button-1" role="button" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    // <Button component={Link} to="/auth"  variant="contained" style={{backgroundColor: "#4682B4",fontSize: "18px",borderRadius:35, color: 'white'}}>Sign In</Button>
                    <Button component={Link} to="/auth" class="button-1" role="button">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
    
}

export default Navbar;