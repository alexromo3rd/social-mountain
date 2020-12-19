import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`https://practiceapi.devmountain.com/api/posts`).then(response => {
      this.setState({
        posts: response.data
      })
    }).catch(err => {
      alert('something went wrong', err);
    })
  }

  updatePost(postId, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${postId}`, {text}).then(response => {
      this.setState({
        posts: response.data
      })
    }).catch(err => {
      alert('something went wrong', err);
    })
  }

  deletePost(postId) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${postId}`).then(response => {
      this.setState({
        posts: response.data
      })
    }).catch(err => {
      alert('something went wrong', err)
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text}).then(response => {
      this.setState({
        posts: response.data
      })
    }).catch(err => {
      alert('something went wrong', err)
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {posts.map(post => {
            return(
              <Post 
                key={post.id} 
                text={post.text} 
                date={post.date} 
                id={post.id}
                updatePostFn={this.updatePost} 
                deletePostFn={this.deletePost}
              />
            )
          })}
        </section>
      </div>
    );
  }
}

export default App;
