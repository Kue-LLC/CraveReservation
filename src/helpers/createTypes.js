const createTypes = (...args) => {
    let obj = {};
    args.map(type => {
        obj[type] = type;
    });
    return obj;
};

export default createTypes;
