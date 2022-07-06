import React from "react";
import { connect } from "react-redux";
import axios from "axios";

const ThingRating = ({ increaseRating, decreaseRating, thing }) => {
  return (
    <div className="rating">
      <label>Rating</label>
      <div>
        <i
          className="fa-solid fa-minus"
          thingid={thing.id}
          thingrating={thing.rating}
          onClick={(e) =>
            decreaseRating(
              e.target.attributes.getNamedItem("thingid").value,
              e.target.attributes.getNamedItem("thingrating").value
            )
          }
        ></i>
        <p>{thing.rating}</p>
        <i
          className="fa-solid fa-plus"
          thingid={thing.id}
          thingrating={thing.rating}
          onClick={(e) =>
            increaseRating(
              e.target.attributes.getNamedItem("thingid").value,
              e.target.attributes.getNamedItem("thingrating").value
            )
          }
        ></i>
      </div>
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
    increaseRating: async (thingId, thingRating) => {
      if (thingRating < 10) {
        const response = await axios.put(
          `/api/things/${thingId}/increaseRating`
        );
        dispatch({
          type: "UPDATE_RATING",
          thingId,
          thingRating: response.data.rating,
        });
      } else {
        return;
      }
    },
    decreaseRating: async (thingId, thingRating) => {
      if (thingRating > 1) {
        const response = await axios.put(
          `/api/things/${thingId}/decreaseRating`
        );
        dispatch({
          type: "UPDATE_RATING",
          thingId,
          thingRating: response.data.rating,
        });
      } else {
        return;
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThingRating);
