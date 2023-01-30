import React, {Component} from 'react';
import {Paper} from "@mui/material";
import ResultFieldComponent from "./resultFieldComponent";
import KeyboardComponent from "./keyboardComponent";
import {connect} from "react-redux";
import expressionActions from "../actions/expression"

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const calcOperands = ["+", "-", "/", "*"];
class Calculator extends Component {

    paperStyles = {
        position: "relative",
        padding: '10px',
        margin: '5% 36% 5% 36%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor:"#e0e0e0"
    }

    constructor(props) {
        super(props);
        this.state = {
            result: "0",
            historyList: [],
            isSecondNumber: false,
            defaultExpressions:[]
        }
    }

    clickToButton = buttonValue => {
        if(buttonValue === "="){
            this.calcInputExpression();
        }
        else if(buttonValue === "C"){
            if(this.state.result==="0"){
                this.setState({
                    historyList: [],
                });
            }
            this.setState({
                result: "0",
                isSecondNumber: false
            });
        }
        else {
            this.checkNumber(buttonValue);
            this.checkOperand(buttonValue);
        }
    }

    checkNumber = (possibleNumber) => {
        if(numbers.includes(Number(possibleNumber))){
            let checkNumber = this.state.result;
            let isSecondNumber = this.state.isSecondNumber;

            if(isSecondNumber){
                let secondNumber = "";
                try{
                    secondNumber = this.state.result.match(/(^-?\d+\.?\d*)([/+*-])(\d+\.?\d*)/)[3];
                }catch (e){

                }
                if(secondNumber === "" && possibleNumber === "0"){
                    this.setState({
                        result: this.state.result + possibleNumber
                    });
                    return;
                }
                if(secondNumber.charAt(0) ==="0"){
                    this.setState({
                        result: this.state.result.slice(0, -1) + possibleNumber
                    });
                    return;
                }
            }else {
                if(checkNumber === "0" && possibleNumber === "0"){
                    return;
                }
                if (checkNumber.charAt(0) === "0") {
                    this.setState({
                        result: this.state.result.slice(0, -1) + possibleNumber
                    });
                    return;
                }
            }

            this.setState({
                result: this.state.result + possibleNumber
            });
        }
    }

    checkOperand = (possibleOperand) => {
        let strResult = this.state.result.toString();
        let isSecondNumber = this.state.isSecondNumber;

        if(calcOperands.includes(possibleOperand)){
            if(isSecondNumber && calcOperands.includes(strResult.charAt(strResult.length-1))){
                this.setState({
                    result: strResult.slice(0, -1) + possibleOperand,
                })
                return;
            }
            if(isSecondNumber && !calcOperands.includes(strResult.charAt(strResult.length-1))){
                this.calcInputExpression(possibleOperand);
                return;
            }
            this.setState({
                result: strResult + possibleOperand,
                isSecondNumber: true
            });
        }
    }
    calcExpression(expressionString){
        let result = expressionString.match(/(^-?\d+\.?\d*)([/+*-])(\d+\.?\d*)/);
        let firstNumber;
        let operand;
        let secondNumber;
        try{
            firstNumber = result[1];
            operand = result[2];
            secondNumber = result[3];
        }catch (e){
            return;
        }
        firstNumber = Number(firstNumber);
        secondNumber = Number(secondNumber);
        let calcResult;
        switch (operand){
            case "+":
                calcResult = firstNumber + secondNumber;
                break;
            case "-":
                calcResult = firstNumber - secondNumber;
                break;
            case "*":
                calcResult = firstNumber * secondNumber;
                break;
            case "/":
                if(secondNumber===0){
                    return;
                }
                calcResult = firstNumber / secondNumber;
                break;
            default:
                break;
        }
        return Number(calcResult).toFixed(0);
    }
    calcInputExpression(nextOperand = ""){
        let calcResult = this.calcExpression(this.state.result);
        if(calcResult!==undefined){
            this.setState({
                historyList: [...this.state.historyList, this.state.result + "=" + calcResult],
                result: calcResult + nextOperand,
                isSecondNumber: nextOperand!==""
            });
        }else {
            this.setState({
                historyList: [...this.state.historyList, this.state.result + "=Error division by zero"],
                isSecondNumber: false,
                result: "0"
            });
        }
    }

    calcBeckEndExpression(){
        let beckEndCalcHistory =[];
        this.state.defaultExpressions.forEach((expression) => {
            let calcResult = this.calcExpression(expression);
            if(calcResult!==undefined){
                beckEndCalcHistory.push(expression + "=" + calcResult);
            }else {
                beckEndCalcHistory.push(expression + "=Error division by zero");
            }

        })
        this.setState({
            historyList: [...this.state.historyList, ...beckEndCalcHistory],
        });
    }

    getAndCalculateDefaultExpression = () => {
        expressionActions.fetchExpressions({
            expressionsCount: 5
        })(this.props.dispatch);

        this.setState({
            defaultExpressions: this.props.expressionState.defaultExpressions
        });
        this.calcBeckEndExpression();
    }

    render() {
        const {
            result,
            historyList
        } = this.state;

        return (
            <Paper sx={this.paperStyles}>
                <ResultFieldComponent result={result} historyList={historyList}/>
                <KeyboardComponent clickProps = {this.clickToButton} calcExpressions={this.getAndCalculateDefaultExpression}/>
            </Paper>
        );
    }
}

const mapReduxStateToProps = reduxState => ({
    expressionState: reduxState
});

const mapDispatchToProps = dispatch => ({
    dispatch,
});

export default connect(mapReduxStateToProps, mapDispatchToProps)(Calculator);