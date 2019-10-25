import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Posts from '../../components/Posts';
import {API_URL} from '../../config/config';

//import Navbar from './Navbar';
console.log(API_URL);

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }    
    componentDidMount() {
        axios.get(API_URL + '/posts')
            .then(response => {
                this.setState({ posts: response.data });
            })
            .catch(function (error) {
                console.log(error);
                alert('Error occurred : '+error);
            })
    }

    render() {
        let recentPostsMarkup = this.state.posts ? (
            this.state.posts.map(post =>
                <Posts post={post} key={post._id} ></Posts>)
        ) : <p>Loading...</p>
        return (
          <div className="container">
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {recentPostsMarkup}
                </Grid>
                <Grid item sm={1} xs={12}>
       
                </Grid>
                <Grid item sm={3} xs={12}>
                    <p>Profile Coming soon...</p>
                </Grid>
            </Grid>
            </div>
        )
    }
}

export default Home;
