import React, {useState, useEffect} from "react";
import * as yup from "yup";
import Axios from "axios";

export default function AddForm(props){
    const [formState, setFormState] = useState({
        url: "",
        title: "",
        author: "",
        categories: [],
        description: ""
    });

    const submitForm = e => {
        e.preventDefault();
        props.addArticle(formState);
        setFormState({
            url: "",
            title: "",
            author: "",
            categories: [],
            description: ""
        });

        Axios
            .post("https://reqres.in/api/users", formState) //change to real url later
            .then(response => console.log(response))
            .catch(err => console.log(err));
        
    }

    
    const formSchema = yup.object().shape({
        url: yup
            .string()
            .required("URL is a required field")
            .min(5),
        title: yup.string(),
        author: yup.string(),
        categories: yup.array(),
        description: yup.string()
      });

      const [errorState, setErrorState] = useState({
        url: "",
        title: "",
        author: "",
        categories: [],
        description: ""
      });
    
    const validate = e => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        yup
            .reach(formSchema, e.target.name)
            .validate(value)
            .then(valid => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: ""
                  });
            })
            .catch(err => {
                setErrorState({
                  ...errorState,
                  [e.target.name]: err.errors[0]
                });
              });
    };

    const inputChange = e => {
        e.persist();
        // console.log("input changed!", e.target.value, e.target.checked);
        validate(e);
        let value =
          e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({ ...formState, [e.target.name]: value });
      };

    return (
        <form onSubmit={submitForm}>
            <label htmlFor="url">URL: </label>
            <input
                type="text"
                id="url"
                name="url"
                placeholder="https://medium.com/"
                onChange={inputChange}
                value={formState.url}
            />
            <br/>

            <label htmlFor="title">Title: </label>
            <input
                type="text"
                id="title"
                name="title"
                placeholder="Cool Article"
                onChange={inputChange}
                value={formState.title}
            />
            <br/>

            <label htmlFor="author">Author: </label>
            <input
                type="text"
                id="author"
                name="author"
                placeholder="Great Author"
                onChange={inputChange}
                value={formState.author}
            />
            <br/>

            <label htmlFor="categories">Categories: </label> <br/>
            <label htmlFor="health">Health </label>
            <input
                type="checkbox"
                id="health"
                name="health"
                onChange={inputChange}
                value={formState.categories}
            />
            <br/>
            <label htmlFor="educational">Educational </label>
            <input
                type="checkbox"
                id="educational"
                name="educational"
                onChange={inputChange}
                value={formState.categories}
            />
            <br/>
            <label htmlFor="sports">Sports </label>
            <input
                type="checkbox"
                id="sports"
                name="sports"
                onChange={inputChange}
                value={formState.categories}
            />
            <br/>
            <label htmlFor="technology">Technology </label>
            <input
                type="checkbox"
                id="technology"
                name="technology"
                onChange={inputChange}
                value={formState.categories}
            />
            <br/>
            <label htmlFor="history">History </label>
            <input
                type="checkbox"
                id="history"
                name="history"
                onChange={inputChange}
                value={formState.categories}
            />
            <br/>
            <label htmlFor="description">Description: </label>
            <br/>
            <textarea
                id="description"
                name="description"
                placeholder="Read later!"
                onChange={inputChange}
                value={formState.description}
            />
            <br/>

            <button type="submit" id="submit">Submit</button>





        </form>
    )



}