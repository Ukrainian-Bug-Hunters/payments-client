import React from "react";
import { Grommet, Header } from "grommet";

const AppHeader = () => {
    return (
        <Grommet>
            <Header background="brand" justify="center">
                <h1 className="App-title">Payments</h1>
            </Header>
        </Grommet>
    )
}

export default AppHeader;
