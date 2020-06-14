export const increment = (counterCaption) => {
    return {
        type: 'INCREMENT',
        counterCaption,
    }
};

export const decrement = (counterCaption) => {
    return {
        type: 'DECREMENT',
        counterCaption,
    }
}