import React, {useState, useEffect} from "react";
import * as yup from "yup";
import Axios as axios from "axios";

export default function AddForm(props){
    const [formState, setFormState] = useState({
        url: "",
        title: "",
        author: "",
        categories: [],
        notes: ""
    });

    const submitForm = e => {
        e.preventDefault();
        props.addArticle(formState);
        setFormState({
            url: "",
            title: "",
            author: "",
            categories: [],
            notes: ""
        });

        Axios
            .post("https://reqres.in/api/users", formState) //change to real url later
            .then(response => console.log(response))
            .catch(err => console.log(err));
        
    }

    



}