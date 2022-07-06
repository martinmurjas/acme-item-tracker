import React from "react";
import { connect } from "react-redux";

const Home = ({ users, things }) => {
  const highestRating = things.reduce((accum, curr) => {
    return curr.rating > accum ? curr.rating : accum;
  }, 0);
  const highestRatedThings = things.filter(
    (thing) => thing.rating === highestRating
  );

  return (
    <div>
      <h1>Home</h1>
      <p>
        Here at the Acme Item Tracker Corp we have {users.length} users and
        {things.length} things!
      </p>
      <h3>
        The highest rated
        {highestRatedThings.length > 1 ? " items " : " item "}
        {highestRatedThings.length > 1 ? "are " : "is "}
      </h3>
      <ul>
        {highestRatedThings.map((thing) => {
          return <li key={thing.id}>{thing.name}</li>;
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

export default connect(mapStateToProps)(Home);
