import * as dateHelperService from "./dateHelper.service";

export const sortColumns = {
    DATE: "date",
    USER_NAME: "username",
    AMOUNT: "amount",
};

export const sortOrders = {
    ASC: "asc",
    DESC: "desc",
};

export const filterTransactions = (transactions, filter) => {
    if (!filter) {
        return transactions;
    }

    var newTransactions = transactions;

    if (filter.recipient !== "") {
        newTransactions = newTransactions.filter((x) => {
            return x.username.includes(filter.recipient);
        });
    }

    if (filter.startAmount !== "") {
        newTransactions = newTransactions.filter((x) => {
            return x.amount >= filter.startAmount;
        });
    }
    if (filter.endAmount !== "") {
        newTransactions = newTransactions.filter((x) => {
            return x.amount <= filter.endAmount;
        });
    }

    if (filter.startDate || filter.endDate) {
        if (filter.startDate) {
            newTransactions = newTransactions.filter((x) => {
                return dateHelperService.parseToDate(x.date) >= filter.startDate;
            });
        }
        if (filter.endDate) {
            var endDate = structuredClone(filter.endDate);
            endDate.setHours(endDate.getHours() + 23);
            endDate.setMinutes(endDate.getMinutes() + 59);
            endDate.setSeconds(endDate.getSeconds() + 59);
            newTransactions = newTransactions.filter((x) => {
                return dateHelperService.parseToDate(x.date) <= endDate;
            });
        }
    }

    return newTransactions;
};

const compare = (v1, v2) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export const sortTransactions = (transactions, sortColumn, sortOrder) => {
    return [...transactions]?.sort((a, b) => {
        var res = 0;
        if (sortColumn === sortColumns.DATE) {
            res = compare(dateHelperService.parseToDate(a[sortColumn]), dateHelperService.parseToDate(b[sortColumn]));
        } else {
            res = compare(a[sortColumn], b[sortColumn]);
        }
        return sortOrder === sortOrders.ASC ? res : -res;
    });
};
