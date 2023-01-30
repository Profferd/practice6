import React, {Component} from 'react';
import {Button} from "@mui/material";

class ButtonComponent extends Component {
    buttonStyles={
        height:'75px',
        width:'75px',
        backgroundColor:'#5fa1a1',
        fontSize: '30px',
    }
    render() {
        const {
            numb,
            clickProps
        } = this.props;

        return (
            <div>
                <Button sx={this.buttonStyles}
                        variant="contained"
                        value={numb}
                        onClick={e => clickProps(e.target.textContent)}
                >
                    {numb}
                </Button>
            </div>
        );
    }
}

export default ButtonComponent;