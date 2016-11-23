import { IAction } from '../actions';
import { TEST_ACTION } from '../actions';
import { handleActions } from 'redux-actions';

export default handleActions({

  [TEST_ACTION]: function(state: any, action: IAction<TEST_ACTION>) {
    return Object.assign({}, state, {
      message: action.payload.message,
    });
  },

}, {});
