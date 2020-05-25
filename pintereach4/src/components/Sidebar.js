import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Divider, List } from "semantic-ui-react";

import { getCategories } from "../actions/articles";

const Sidebar = (props) => {
    const user = localStorage.getItem("user");

    useEffect(() => {
        props.getCategories();
    }, []);

    //console.log(props.categories);

    return (
        <Grid.Column width={3}>
            <div className="branding">
                <h1>Pintereach</h1>
                <p>
                    <i>Keep your research in reach</i>
                </p>
            </div>
            <Divider hidden />
            <p>
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
            <Divider hidden />
            <a className="ui brown button" href="/add-article">
                Add New Article
            </a>
            <Divider hidden />
            <ul className="categories">
                <li>
                    <a href="/articles/">All Articles</a>
                </li>
                {props.categories.map((category) => {
                    return (
                        <li key={category.id}>
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
    console.log("sidebar state", state);
    return {
        isLoading: state.articles.isLoading,
        isLoaded: state.articles.isLoaded,
        categories: state.articles.categories,
    };
};

export default connect(mapStateToProps, { getCategories })(Sidebar);
