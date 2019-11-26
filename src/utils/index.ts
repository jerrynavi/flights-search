import * as reducerActions from './reducerActions';

export const formatCurrency = (amount: string): string => {
    return new Intl.NumberFormat('en-ng', {style: 'currency', currency: 'NGN' }).format(Number(amount));
};

export const actions = reducerActions;

export const STORE_NAME = '__flight_test';