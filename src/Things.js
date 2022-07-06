//built-in imports
import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { faker } from "@faker-js/faker";

//local imports
import "./Things.css";
import ThingOwnerSelection from "./ThingOwnerSelection";
import ThingRating from "./ThingRating";

const Things = ({ things, createThing, deleteThing }) => {
  return (
    <div className="Things">
      <div>
        <h1>Things</h1>
        <i className="fa-solid fa-plus" onClick={createThing}></i>
      </div>
      <ul>
        {things.map((thing) => {
          return (
            <li key={thing.id}>
              <h2>{thing.name}</h2>
              <i
                className="fa-solid fa-trash"
                thingid={thing.id}
                onClick={(e) =>
                  deleteThing(e.target.attributes.getNamedItem("thingid").value)
                }
              ></i>
              <ThingOwnerSelection thing={thing} />
              <ThingRating thing={thing} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    things: state.things,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createThing: async () => {
      const response = await axios.post("/api/things", {
        name: faker.commerce.product(),
      });
      const thing = response.data;
      dispatch({ type: "CREATE_THING", thing });
    },
    deleteThing: async (thingId) => {
      await axios.delete(`/api/things/${thingId}`);
      dispatch({ type: "DELETE_THING", thingId });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Things);
