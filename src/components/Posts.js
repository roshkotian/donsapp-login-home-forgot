import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import relativeTime from 'dayjs/plugin/relativeTime'
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import { Grid, Tooltip } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
//dayjs
import dayjs from 'dayjs';

const styles = {
    card:
    {
        // display: 'flex',
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 160,
        maxHeight: 150,

    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    body2:
    {
        fontFamily: 'Segoe UI',
        fontSize: '0.925rem'

    },
    username:
    {
        fontFamily: 'Segoe UI',
        color: '#077bbf'

    },
    deleteButton: {
        position: 'absolute',
        left: '90%',
    },
    favouriteicon: {
        color: '#077bbf'
    }

}

class Posts extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { classes, post: { body, createdAt, userid } } = this.props

        return (
            <Card className={classes.card}>
                {/* <CardMedia className={classes.image} image="profile_image.jpg"></CardMedia> */}
                {/* <CardContent className={classes.content}>

                    <Typography variant="h5" className={classes.username} component={Link} to="/Home" >{userid}</Typography>
                    <IconButton className={classes.button} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                    <Typography variant="body1" className={classes.body2} color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography className={classes.body2} variant="body2">{body}</Typography>
                </CardContent> */}
                <CardContent className={classes.content}>
                    <Grid container justify="space-between"  >
                        <Grid item sm={11}>
                            <Typography variant="h5" className={classes.username} component={Link} to="/Home" >{userid}</Typography>
                        </Grid>
                        <Grid item sm={1} >
                            <Tooltip title="Delete Post" placement="top">
                                <Button className={classes.deleteButton}>
                                    <DeleteOutline color="secondary" />
                                </Button>
                            </Tooltip>
                        </Grid>
                        <Grid item sm={12} >
                            <Typography variant="body1" className={classes.body2} color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                        </Grid>
                        <Grid item sm={12} >
                            <Typography className={classes.body2} variant="body2">{body}</Typography>
                        </Grid>
                    </Grid>
                    <Button className={classes.favouriteicon}>
                        <FavoriteIcon />
                    </Button>
                    <span>Likes</span>
                    <Button className={classes.favouriteicon}>
                        <ChatIcon />
                    </Button>
                    <span>Comments</span>
                </CardContent>
            </Card >
        );
    }
}

export default withStyles(styles)(Posts);