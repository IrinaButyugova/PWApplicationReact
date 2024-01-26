export const parseToDate = (str) => {
    const day = Number(str.substr(0, 2));
    const month = Number(str.substr(3, 2)) - 1;
    const year = Number(str.substr(6, 4));
    const hours = Number(str.substr(12, 2));
    const minutes = Number(str.substr(15, 2));
    const seconds = Number(str.substr(18, 2));
    return new Date(year, month, day, hours, minutes, seconds);
};
