export const isEmpty = (string) => {
    if (!string) return true;
    return string.length < 2 ? true : false;
};
