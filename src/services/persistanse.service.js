export const set = (key, data) => {
    try {
        localStorage.setItem(key, data);
    } catch (e) {
        console.error("Error saving to localStorage", e);
    }
};

export const get = (key) => {
    try {
        const item = localStorage.getItem(key);
        if (item) {
            return item;
        }
    } catch (e) {
        console.error("Error saving to localStorage", e);
    }
};
