import React, {useState}from "react";
import AddForm from "./AddForm";
import Header from "./Header";


const Dashboard = (props) => {
    const [articles, setArticle] = useState([{
        url: "",
        title: "",
        author: "",
        categories: [],
        notes: ""
    }]);

    const addArticle = article => {
        const newArticle = {
            url: article.url,
            title: article.title,
            author: article.author,
            categories: article.categories,
            notes: article.notes
        };

        setArticle([...articles, newArticle]);

    };

    return (
        <div>
            <Header/>
            <AddForm addArticle = {addArticle}/>
        </div>
        
    );
};

export default Dashboard;
