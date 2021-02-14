import React, { useEffect, useState } from "react";
import "./App.scss";
import Home from "./components/Home/Home";
import UserContext from "./UserContext";
import axios from "axios";
import { IUser } from "./model/IUser";
import { Link, Route, Switch } from "react-router-dom";
import Posts from "./components/Posts/Posts";
import { IPost } from "./model/IPost";
import PostContext from "./PostContext";
import PostDetails from "./components/PostDetails/PostDetails";
import ThemeContext, { ThemeName } from "./ThemeContext";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Footer from "./components/Footer/Footer";

const App: React.FC<{}> = () => {
  const baseUrl: string = "https://jsonplaceholder.typicode.com";
  const [users, setUsers] = useState<IUser[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [themeName, setThemeName] = React.useState<ThemeName>("light");

  const getUsers = () => {
    const request = axios.get(`${baseUrl}/users`);

    return request;
  };

  const getPosts = () => {
    const request = axios.get(`${baseUrl}/posts`);

    return request;
  };

  const setTheme = (name: ThemeName) => {
    setThemeName(name);
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

  const toggleTheme = () => {
    themeName === "dark" ? setTheme("light") : setTheme("dark");
  };

  const appNameStyle: any = {
    light: {
      color: "#5a3201",
    },
    dark: {
      color: "#ca940a",
    },
  };

  const appBackGround: any = {
    light: {
      backgroundColor: "#fefefe",
      transition: `all 500ms ease-in-out`,
    },
    dark: {
      backgroundColor: "#1a1a1a",
      color: "#fefefe",
      transition: `all 500ms ease-in-out`,
    },
  };

  return (
    <ThemeContext.Provider value={{ theme: themeName, setTheme }}>
      <UserContext.Provider value={users}>
        <PostContext.Provider value={posts}>
          <Switch>
            <React.Fragment>
              <div
                className="App col-md-12"
                style={
                  themeName === "dark"
                    ? appBackGround.dark
                    : appBackGround.light
                }
              >
                <Link
                  to="/"
                  className="app-name"
                  style={
                    themeName === "dark"
                      ? appNameStyle.dark
                      : appNameStyle.light
                  }
                >
                  Prodigy Design
                </Link>
                <span className="theme" onClick={toggleTheme}>
                  {themeName === "dark" ? (
                    <span className="theme-selector">
                      <i className="far fa-moon"></i>
                    </span>
                  ) : (
                    <span className="theme-selector">
                      <i className="far fa-sun"></i>
                    </span>
                  )}
                </span>
                <Route path="/" exact component={Home}></Route>
                <Route path="/posts/:id" exact component={Posts}></Route>
                <Route path="/posts" exact component={Posts}></Route>
                <Route
                  path="/post-details/:id"
                  exact
                  component={PostDetails}
                ></Route>
                <ScrollToTop />
                <Footer />
              </div>
            </React.Fragment>
          </Switch>
        </PostContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
