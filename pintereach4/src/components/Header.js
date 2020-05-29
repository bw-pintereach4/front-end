import React from "react";
import { Dropdown, Menu, Divider } from "semantic-ui-react";

export default function Header() {
    return (
        <Menu fixed="top">
            <Dropdown item icon="bars">
                <Dropdown.Menu>
                    <Dropdown.Item
                        icon="server"
                        text="All articles"
                        onClick={() => {
                            window.location.replace("/articles");
                        }}
                    />
                    <Dropdown.Item
                        icon="edit"
                        text="Add articles"
                        onClick={() => {
                            window.location.replace("/add-article");
                        }}
                    />
                    <Divider />
                    <Dropdown.Item
                        icon="heart"
                        text="Health"
                        onClick={() => {
                            window.location.replace("/articles/category/1");
                        }}
                    />
                    <Dropdown.Item
                        icon="book"
                        text="Educational"
                        onClick={() => {
                            window.location.replace("/articles/category/2");
                        }}
                    />
                    <Dropdown.Item
                        icon="cogs"
                        text="Sports"
                        onClick={() => {
                            window.location.replace("/articles/category/3");
                        }}
                    />
                    <Dropdown.Item
                        icon="futbol"
                        text="Technology"
                        onClick={() => {
                            window.location.replace("/articles/category/4");
                        }}
                    />
                    <Dropdown.Item
                        icon="archive"
                        text="History"
                        onClick={() => {
                            window.location.replace("/articles/category/5");
                        }}
                    />
                </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>
                <h1>
                    <a
                        href="https://bw-pintereach.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Pintereach
                    </a>
                </h1>
            </Menu.Item>
            <Menu.Item
                position="right"
                onClick={() => {
                    //console.log("delete");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.reload(true);
                }}
            >
                Logout
            </Menu.Item>
        </Menu>
    );
}
