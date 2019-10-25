import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import NotificationIcon from '@material-ui/icons/Notifications';
import Tooltip from '@material-ui/core/Tooltip';

class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className="nav-container" >
                        <Tooltip title="Add Post" placement="top">
                            <Button color="inherit">
                                <AddIcon color="primary"></AddIcon>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Home" placement="top">
                            <Link to="/Home">
                                <HomeIcon color="primary"></HomeIcon>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Notifications" placement="top">
                            <Button>
                                <NotificationIcon color="primary"></NotificationIcon>
                            </Button>
                        </Tooltip>
                    {/* <Button color="inherit" component={Link} to="/login" >Login</Button>
                    <Button color="inherit" component ={Link} to="/Home" >Home</Button>
                    <Button color="inherit" component={Link} to="/Register" >Register</Button> */}
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar;