import React, {Component} from 'react';
import ButtonComponent from "./buttonComponent";
import {Button, Grid} from "@mui/material";

const calcButtonLabels = ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', 'C', '0', '=', '/'];
class KeyboardComponent extends Component {

    buttonStyles={
        marginTop:"20px",
        height:"70px",
        width:"100%"
    }
    render() {
        const {
            clickProps,
            calcExpressions,
        } = this.props;

        return (
            <Grid container
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                  sx={{padding:'30px'}}
            >
                {calcButtonLabels.map(
                    (calcLabel, index) =>
                        <Grid item xs={2} sm={3} md={3} key={index}>
                            <ButtonComponent numb={calcLabel} clickProps={clickProps}/>
                        </Grid>
                )}
                <Button
                    sx={this.buttonStyles}
                    variant="contained"
                    onClick={calcExpressions}
                >
                    Get and solve expression
                </Button>
            </Grid>
        );
    }
}

export default KeyboardComponent;