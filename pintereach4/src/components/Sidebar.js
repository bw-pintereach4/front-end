import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Divider } from "semantic-ui-react";

import { getCategories } from "../actions/articles";

const icons = ["heart", "book", "cogs", "futbol", "archive"];

const Sidebar = ({ getCategories, isLoading, isLoaded, categories }) => {
    //const user = localStorage.getItem("user");

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    return (
        <Grid.Column width={3}>
            <p>
                <i>Keep your research in reach..</i>
            </p>
            {/* <div className="branding">
                <h1>Pintereach</h1>
                
            </div>
            <Divider hidden /> */}
            {/* <p>
                Welcome {user},{" "}
                <a
                    href="/"
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                    }}
                >
                    Logout
                </a>
            </p> 
            <Divider hidden />*/}
            <a className="ui brown button" href="/add-article">
                Add New Article
            </a>
            <Divider hidden />
            <ul className="categories">
                <li>
                    <a href="/articles/">
                        <i aria-hidden="true" className="server small icon"></i>{" "}
                        All Articles
                    </a>
                </li>
                {categories.map((category, index) => {
                    return (
                        <li key={category.id}>
                            <i
                                aria-hidden="true"
                                className={`${icons[index]} small icon`}
                            ></i>
                            <a href={`/articles/category/${category.id}`}>
                                {category.category_name}
                            </a>
                        </li>
                    );
                })}
            </ul>
            <Divider hidden />
            <p>&copy; All rights reserved.</p>
        </Grid.Column>
    );
};

// hook up the connect to our store
const mapStateToProps = (state) => {
    //console.log("sidebar state", state);
    return {
        isLoading: state.articles.isLoading,
        isLoaded: state.articles.isLoaded,
        categories: state.articles.categories,
    };
};

export default connect(mapStateToProps, { getCategories })(Sidebar);
