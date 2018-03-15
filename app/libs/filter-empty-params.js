export default obj => Object.entries(obj)
    .filter(
        ([, val]) => val
    )
    .reduce(
        (acc, curr) => {
            const [key, val] = curr;
            acc[key] = val;

            return acc;
        },
        {}
    );
