/* eslint-disable react-hooks/exhaustive-deps */
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IUser } from "../../model/IUser";
import ThemeContext from "../../ThemeContext";
import UserContext from "../../UserContext";
import "./Home.scss";

interface UserProps {
  columns: string[];
  users: IUser[];
  style: CSSProperties;
  navLinkStyles: CSSProperties;
}

const Table: React.FC<UserProps> = (props: UserProps) => {
  return (
    <table className="users-table" style={props.style}>
      <thead className="table-head">
        <tr>
          {props.columns.map((item, i) => {
            return (
              <th key={i} className="table-column head" style={props.style}>
                {item}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {props.users.map((user, i) => {
          return (
            <tr key={i}>
              <td className="table-column" style={props.style}>
                {i + 1}
              </td>
              <td className="table-column" style={props.style}>
                {user.name}
              </td>
              <td className="table-column" style={props.style}>
                {user.company.name}
              </td>
              <td className="table-column" style={props.style}>
                <Link
                  className="blog-links"
                  style={props.navLinkStyles}
                  to={`/posts/:${user.id}`}
                >
                  <span title="View blogs posted by this user">
                    View Blogs <i className="fas fa-blog"></i>
                  </span>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Cards: React.FC<UserProps> = (props: UserProps) => {
  return (
    <div className="user-cards">
      {props.users.map((user, i) => {
        return (
          <Card key={i} style={props.style}>
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Subtitle className="mb-2">
                {user.company.name}
              </Card.Subtitle>
              <div>
                <p>{user.phone}</p>
                <p>{user.email}</p>
                <Link
                  className="blog-links"
                  style={props.navLinkStyles}
                  to={`/posts/:${user.id}`}
                >
                  <span title="View blogs posted by this user">
                    View Blogs <i className="fas fa-blog"></i>
                  </span>
                </Link>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const Home: React.FC<{}> = () => {
  const users = useContext(UserContext);
  const themeType = useContext(ThemeContext);
  const columns: string[] = ["#", "Name", "Company", "Blog Posts"];
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const themeColors: any = {
    table: {
      light: {},
      dark: {
        borderColor: "#fefefe",
        borderBottomColor: "#fefefe",
        borderRightColor: "#fefefe",
        color: "fefefe",
      },
    },
    card: {
      light: {},
      dark: {
        color: "fefefe",
        backgroundColor: "#1a1a1a",
        borderColor: "#ffff",
      },
    },
  };

  const navLinksColors: any = {
    table: {
      light: {
        color: "#1a1a1a",
        textDecoration: "none",
      },
      dark: {
        color: "#fefefe",
        textDecoration: "none",
      },
    },
    card: {
      light: {
        color: "#1a1a1a",
        textDecoration: "none",
      },
      dark: {
        color: "#fefefe",
        textDecoration: "none",
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);

    if (windowDimensions.width < 450) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    setFilteredUsers(users);

    return () => window.removeEventListener("resize", handleResize);
  }, [users]);

  const searchByInput = (input: string, key: string) => {
    if (input === null) {
      setFilteredUsers(users);
    }

    if (key === "name") {
      setFilteredUsers(
        users.filter((user) => {
          return user.name.toLowerCase().includes(input.toLowerCase());
        })
      );
    } else if (key === "company") {
      setFilteredUsers(
        users.filter((user) => {
          return user.company.name.toLowerCase().includes(input.toLowerCase());
        })
      );
    }
  };

  return (
    <div id="home">
      <div className="filter-div">
        <label
          className="labelText"
          id="firstLabel"
          title="Filter table by Name"
        >
          User Name:
        </label>
        <input
          type="text"
          className="filter-fields"
          placeholder="filter users by name"
          onChange={(event) => {
            searchByInput(event.currentTarget.value, "name");
          }}
        />
      </div>
      <div>
        <label className="labelText" title="Filter table by Company Name">
          Company Name:
        </label>
        <input
          type="text"
          className="filter-fields"
          placeholder="filter users by company name"
          onChange={(event) => {
            searchByInput(event.currentTarget.value, "company");
          }}
        />
      </div>
      <div className="col-md-12" id="users">
        {isMobile ? (
          <Cards
            columns={columns}
            style={
              themeType.theme === "dark"
                ? themeColors.card.dark
                : themeColors.card.light
            }
            navLinkStyles={
              themeType.theme === "dark"
                ? navLinksColors.card.dark
                : navLinksColors.card.light
            }
            users={filteredUsers}
          />
        ) : (
          <Table
            style={
              themeType.theme === "dark"
                ? themeColors.table.dark
                : themeColors.table.light
            }
            navLinkStyles={
              themeType.theme === "dark"
                ? navLinksColors.table.dark
                : navLinksColors.table.light
            }
            columns={columns}
            users={filteredUsers}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
