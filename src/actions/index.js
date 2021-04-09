export const characterAddedToList = (newCharacter) => {
    return {
        type: 'CHARACTER_ADDED_TO_LIST',
        payload: newCharacter
    };
};