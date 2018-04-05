import { Map } from 'immutable';
import * as matchers from 'jasmine-immutable-matchers';

import {
  REQUEST_FAILURE,
  REQUEST_SEND,
  REQUEST_SUCCESS,
} from 'normandy/state/action-types';
import { DEFAULT_REQUEST } from 'normandy/state/constants';
import requestsReducer from 'normandy/state/app/requests/reducers';
import { INITIAL_STATE } from 'normandy/tests/state/requests';

describe('Requests reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  test('should return initial state by default', () => {
    expect(requestsReducer(undefined, { type: 'INITIAL' })).toEqual(
      INITIAL_STATE,
    );
  });

  test('should handle REQUEST_SEND', () => {
    expect(
      requestsReducer(undefined, {
        type: REQUEST_SEND,
        requestId: 'test',
      }),
    ).toEqualImmutable(
      INITIAL_STATE.set('test', DEFAULT_REQUEST.set('inProgress', true)),
    );
  });

  test('should handle REQUEST_SUCCESS', () => {
    expect(
      requestsReducer(undefined, {
        type: REQUEST_SUCCESS,
        requestId: 'test',
      }),
    ).toEqualImmutable(INITIAL_STATE.set('test', DEFAULT_REQUEST));
  });

  const ERROR = { message: 'test message' };

  test('should handle REQUEST_FAILURE', () => {
    expect(
      requestsReducer(undefined, {
        type: REQUEST_FAILURE,
        error: ERROR,
        requestId: 'test',
      }),
    ).toEqualImmutable(
      INITIAL_STATE.set('test', DEFAULT_REQUEST.set('error', new Map(ERROR))),
    );
  });
});
