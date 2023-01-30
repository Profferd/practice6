import React, {Component} from 'react';
import {Container, FilledInput} from "@mui/material";
class ResultFieldComponent extends Component {
    filedStyles = {
        width:"100%"
    }
    render() {
        const { result, historyList } = this.props;

        return (
            <Container>
                {historyList.slice(0, historyList.length-1).map(
                    (item, index) =>
                        <FilledInput
                            inputProps={{style: {fontSize: 30, textAlign:"right", color:"grey"}}}
                            sx={this.filedStyles}
                            value={item}
                            multiline
                            key={index}
                        />
                )}
                {
                    historyList.length!==0 ?
                        <FilledInput
                            inputProps={{style: {fontSize: 30, textAlign:"right", color:"grey"}}}
                            sx={this.filedStyles}
                            value={historyList[historyList.length-1]}
                            multiline
                        /> : null
                }

                <FilledInput
                    inputProps={{style: {fontSize: 30, textAlign:"right"}}}
                    sx={this.filedStyles}
                    value={result}
                    multiline
                />
            </Container>
        );
    }
}
export default (ResultFieldComponent);