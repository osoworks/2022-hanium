import logo from './logo.svg';
import './App.css';
import List from './components/list';
import axios from 'axios';
import {useState, useEffect} from 'react';
import React from 'react';


function App() {
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    axios
    .get('')
    .then((response) => {
      setPosts(response.data);
    })
  }
  useEffect(getPosts, []);
  return (
    <List items={posts}/>
  );
}

export default App;