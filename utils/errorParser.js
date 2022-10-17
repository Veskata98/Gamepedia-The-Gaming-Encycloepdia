const errorParser = (error) => {
    const errors = [];
    if (error.errors) {
        Object.values(error.errors).forEach((e) => errors.push(e.properties.message));
    } else if (error.message.includes('\n')) {
        errors.push(...error.message.split('\n'));
    } else {
        errors.push(error.message);
    }

    return errors;
};

export { errorParser };
