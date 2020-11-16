import React from "react";

export const UserContext = React.createContext({
  userObj: null,
  updateUser: () => {},
});
