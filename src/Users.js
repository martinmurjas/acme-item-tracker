//built-in imports
import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { faker } from "@faker-js/faker";

//local imports
import "./Users.css";

const Users = ({ users, things, createUser, deleteUser }) => {
  return (
    <div className="Users">
      <div>
        <h1>Users</h1>
        <i className="fa-solid fa-plus" onClick={createUser}></i>
      </div>

      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <div>
                {user.name}
                <i
                  className="fa-solid fa-trash"
                  userid={user.id}
                  onClick={(e) =>
                    deleteUser(e.target.attributes.getNamedItem("userid").value)
                  }
                ></i>
              </div>
              <p>Items owned by {user.name}:</p>
              <ul className="items">
                {things
                  .filter((thing) => thing.userId === user.id)
                  .map((thing) => {
                    return <li key={thing.id}>{thing.name}</li>;
                  })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    things: state.things,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: async () => {
      const response = await axios.post("/api/users", {
        name: faker.name.firstName(),
      });
      const user = response.data;
      dispatch({ type: "CREATE_USER", user });
    },
    deleteUser: async (userId) => {
      await axios.delete(`/api/users/${userId}`);
      dispatch({ type: "DELETE_USER", userId });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
