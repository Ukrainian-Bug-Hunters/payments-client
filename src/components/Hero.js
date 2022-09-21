import React from "react";
import { Grommet, Select } from "grommet";

const Hero = () => {
    const [value, setValue] = React.useState('USD');

    return (
        <Grommet>
            <div className="Balance-container">
                <h2 className="Balance-title">Your account balance is</h2>
                    <span className="Balance-value">£ 87.43</span>
                <p className="Balance-convert">Your balance is <span>???</span> in <span>
                    <Select className="Convert-select"
                        options={['USD']}
                        value={value}
                        onChange={({ option }) => setValue(option)}
                    />
                    </span>
                </p>
            </div>
        </Grommet>
    )
}

export default Hero;
