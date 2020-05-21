import axios from "axios";

// this makes one instance of axios to use throughout the project
// if we don't do this, we make a new instance every time we do an axios call
// this is very inefficient
export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            Authorization: token,
        },
    });
};
