import React from "react";
import { connect } from "react-redux";
import axios from "axios";

const ThingOwnerSelection = ({ users, changeOwner, thing }) => {
  return (
    <select
      value={thing.userId ? thing.userId : 0}
      onChange={(e) => changeOwner(thing.id, e.target.value)}
    >
      <option value={0}>Item is not owned</option>
      {users.map((user) => {
        return (
          <option key={user.id} value={user.id}>
            Item is owned by {user.name}
          </option>
        );
      })}
    </select>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeOwner: async (thingId, userId) => {
      const thing = (
        await axios.put(`/api/things/${thingId}/selectOwner/${userId}`)
      ).data;
      dispatch({
        type: "SELECT_OWNER",
        thing,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThingOwnerSelection);
