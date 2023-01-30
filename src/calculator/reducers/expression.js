const initialState = {
    isLoading: false,
    defaultExpressions:[],
};

export default (state = initialState, action) => {

    switch (action.type) {

        case 'ERROR_EXPRESSIONS': {
            return {
                ...state,
                isLoading: true,
            };
        }

        case 'REQUEST_EXPRESSIONS': {
            return {
                ...state,
                isLoading: true,
            };
        }

        case 'RECEIVE_EXPRESSIONS': {
            const {
                expressionList,
            } = action;
            return {
                ...state,
                isLoading: false,
                defaultExpressions: expressionList,
            };
        }

        default: return state;
    }

};