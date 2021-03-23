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
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
