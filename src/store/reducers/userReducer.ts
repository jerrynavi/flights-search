import { createReducer, createAction } from 'redux-starter-kit';
import { state } from '../state';

export const userReducer = createReducer(state.user, {
    UPDATE_USER_INFORMATION: (user, action) => {
        if (!action.payload) {
            user = null;
        } else {
            user = {...action.payload};
        }
        return user;
    }
});
createAction('UPDATE_USER_INFORMATION');
