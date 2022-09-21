import React from "react";
import { Grommet, Footer } from "grommet";

const AppFooter = () => {
    return (
        <Grommet>
            <Footer background="brand" justify="center" className="App-footer">
                <h2 className="Footer-text">Copyright © 2022 Bug Hunters, Inc.</h2>
            </Footer>
        </Grommet>
    )
}

export default AppFooter;
