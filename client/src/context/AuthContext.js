import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "620274da618be28a870b864c",
    username: "lala",
    email: "lala@gmail.com",
    isAdmin: false,
    profilePicture: "person/1.jpeg",
    coverPicture: "post/5.jpeg",
    followings: [],
    followers: [],
    desc: "",
    city: "",
    from: "",
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        error: state.error,
        isFetching: state.isFetching,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
