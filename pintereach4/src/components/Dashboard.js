import React from "react";
import AddForm from "./AddForm";

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
        <AddForm addArticle = {addArticle}/>
    );
};

export default Dashboard;
