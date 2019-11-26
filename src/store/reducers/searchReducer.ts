import { createReducer, createAction } from 'redux-starter-kit';
import { state } from '../state';

export const searchReducer = createReducer(state, {
    UPDATE_SEARCH_DATA: (state, action) => {
        state.currentSearch = action.payload;
        return state;
    }
});
createAction('UPDATE_SEARCH_DATA');
