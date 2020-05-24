import { combineReducers } from "redux";
import { usersLogin } from "./usersLogin.js";
import { usersRegister } from "./usersRegister.js";
import { articles } from "./articles.js";

export const reducer = combineReducers({ usersLogin, usersRegister, articles });
