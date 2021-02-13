import React, { useEffect, useState } from "react";
import "./App.scss";
import Home from "./components/Home/Home";
import UserContext from "./UserContext";
import axios from "axios";
import { IUser } from "./model/IUser";
import { Route, Switch } from "react-router-dom";
import Posts from "./components/Posts/Posts";
import { IPost } from "./model/IPost";
import PostContext from "./PostContext";
import PostDetails from "./components/PostDetails/PostDetails";

const App: React.FC<{}> = () => {
  const baseUrl: string = "https://jsonplaceholder.typicode.com";
  const [users, setUsers] = useState<IUser[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);

  const getUsers = () => {
    const request = axios.get(`${baseUrl}/users`);

    return request;
  };

  const getPosts = () => {
    const request = axios.get(`${baseUrl}/posts`);

    return request;
  };

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error(err);
      });

    getPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <UserContext.Provider value={users}>
      <PostContext.Provider value={posts}>
        <Switch>
          <div className="App jumbotron">
            <a href="/" className="app-name">
              Prodigy Design
            </a>
            <Route path="/" exact component={Home}>
              <Home />
            </Route>
            <Route path="/posts/:id" exact component={Posts}>
              <Posts />
            </Route>
            <Route path="/posts" exact component={Posts}>
              <Posts />
            </Route>
            <Route path="/post-details/:id" exact component={PostDetails}>
              <PostDetails />
            </Route>
          </div>
        </Switch>
      </PostContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
