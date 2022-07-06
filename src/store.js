import { createStore } from "redux";

const initialState = {
  view: window.location.hash.slice(1),
  users: [],
  things: [],
};

const store = createStore((state = initialState, action) => {
  if (action.type === "SET_THINGS") {
    return {
      ...state,
      things: action.things.sort((a, b) => {
        return a.id - b.id;
      }),
    };
  }
  if (action.type === "SET_USERS") {
    return { ...state, users: action.users };
  }
  if (action.type === "SET_VIEW") {
    return { ...state, view: action.view };
  }
  if (action.type === "CREATE_THING") {
    return {
      ...state,
      things: [...state.things, action.thing].sort((a, b) => {
        return a.id - b.id;
      }),
    };
  }
  if (action.type === "CREATE_USER") {
    return { ...state, users: [...state.users, action.user] };
  }
  if (action.type === "DELETE_THING") {
    return {
      ...state,
      things: state.things
        .filter((thing) => thing.id !== action.thingId * 1)
        .sort((a, b) => {
          return a.id - b.id;
        }),
    };
  }
  if (action.type === "DELETE_USER") {
    return {
      ...state,
      users: state.users
        .filter((user) => user.id !== action.userId * 1)
        .sort((a, b) => {
          return a.id - b.id;
        }),
    };
  }
  if (action.type === "UPDATE_RATING") {
    const thing = state.things.find((thing) => thing.id === action.thingId * 1);
    thing.rating = action.thingRating;
    return {
      ...state,
      things: [
        ...state.things.filter((thing) => thing.id !== action.thingId * 1),
        thing,
      ].sort((a, b) => {
        return a.id - b.id;
      }),
    };
  }
  if (action.type === "SELECT_OWNER") {
    const revisedThing = action.thing;
    revisedThing.userId = revisedThing.userId * 1;

    return {
      ...state,
      things: [
        ...state.things.filter((thing) => thing.id !== action.thing.id * 1),
        revisedThing,
      ].sort((a, b) => {
        return a.id - b.id;
      }),
    };
  }
  return state;
});

export default store;
