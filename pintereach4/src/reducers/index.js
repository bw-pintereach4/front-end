import { combineReducers } from "redux";
import { usersLogin } from "./usersLogin.js";
import { usersRegister } from "./usersRegister.js";

export const reducer = combineReducers({ usersLogin, usersRegister });
