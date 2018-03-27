import { createStore, applyMiddleware } from 'redux'
import app from '../Reducers'

import createSagaMiddleware from 'redux-saga'
import rootSaga from '../Sagas'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore() {
    const store = createStore(app, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(rootSaga)
    return store
}