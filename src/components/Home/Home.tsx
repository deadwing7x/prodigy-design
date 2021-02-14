import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../model/IUser";
import ThemeContext from "../../ThemeContext";
import UserContext from "../../UserContext";
import "./Home.scss";

interface TableProps {
  columns: string[];
  users: IUser[];
  style: CSSProperties;
  navLinkStyles: CSSProperties;
}

const Table: React.FC<TableProps> = (props: TableProps) => {
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

const Home: React.FC<{}> = () => {
  const users = useContext(UserContext);
  const themeType = useContext(ThemeContext);
  const columns: string[] = ["#", "Name", "Company", "Blog Posts"];
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const themeColors: any = {
    light: {},
    dark: {
      borderColor: "#fefefe",
      borderBottomColor: "#fefefe",
      borderRightColor: "#fefefe",
      color: "fefefe",
    },
  };

  const navLinksColors: any = {
    light: {
      color: "#1a1a1a",
      textDecoration: 'none'
    },
    dark: {
      color: "#fefefe",
      textDecoration: 'none'
    },
  };

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const searchByInput = (input: string, key: string) => {
    if (input === null) {
      setFilteredUsers(users);
    }

    if (key === "name") {
      setFilteredUsers(
        users.filter((user) => {
          return user.name.toLowerCase().includes(input);
        })
      );
    } else if (key === "company") {
      setFilteredUsers(
        users.filter((user) => {
          return user.company.name.toLowerCase().includes(input);
        })
      );
    }
  };

  return (
    <div id="home">
      <div>
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
        <Table
          style={
            themeType.theme === "dark" ? themeColors.dark : themeColors.light
          }
          navLinkStyles={
            themeType.theme === "dark"
              ? navLinksColors.dark
              : navLinksColors.light
          }
          columns={columns}
          users={filteredUsers}
        />
      </div>
    </div>
  );
};

export default Home;
