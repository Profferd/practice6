const receiveExpressions = expressionList => ({ expressionList, type: 'RECEIVE_EXPRESSIONS' });
const requestExpressions = () => ({ type: 'REQUEST_EXPRESSIONS' });
const errorReceiveExpressions = () => ({ type: 'ERROR_EXPRESSION' });
const getExpressions = (expressionsCount) => {
    return  fetch('http://localhost:8080/math/examples?count='+expressionsCount,{
        method: "GET",
    })
        .then((response) => {
            return response.json();
        });
};

const fetchExpressions = ({expressionsCount}) => (dispatch) => {
    dispatch(requestExpressions());
    return getExpressions(expressionsCount)
        .then(expressionList => dispatch(receiveExpressions(expressionList)))
        .catch(() => dispatch(errorReceiveExpressions()));

};

export default {
    fetchExpressions,
};