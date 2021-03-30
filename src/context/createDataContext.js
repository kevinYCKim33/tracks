import React, { createContext, useReducer } from "react";
// https://www.udemy.com/course/the-complete-react-native-and-redux-course/learn/lecture/15708354#notes

// basically a Grider HOC that will become more reusable
// have a state and actions you want to import? they come straight from here
export default (reducer, actions, defaultValue) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
      // basically associate an action with the useReducer dispatch
      // when we actually trigger the function, it will use the dispatch through closure
      // i.e. for AuthContext
      // actions === {signin, signout, signup...}
      // const signin = (dispatch) => async ({email, password}) => {
      // do something
      // dispatch({type: "signin", payload: response.data.token})
      //}
      // pre-execute dispatch that will be associated with this particular useReducer
      // then when we actually execute signin() the dispatch will be associated with AuthContext
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
