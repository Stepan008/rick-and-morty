const initialState = {
    characters: []
};

const reducer = (state = initialState, action) => {

    switch ( action.type) {
        case 'CHARACTER_ADDED_TO_LIST':
            const oldCaracters = state.characters;
            return {
                characters: [
                    ...oldCaracters,
                    action.payload
                ]
            };

        default:
            return state;
    }
}

export default reducer;