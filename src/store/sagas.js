import { authSagas } from 'modules/auth';
import { engineRootSaga } from 'modules/engine';
import {all} from 'redux-saga/effects';

export default function* sagas() {
  yield all([
      authSagas(),
      engineRootSaga(),
  ]);
}
