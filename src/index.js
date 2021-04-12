import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './store';
import ReservationPage from './pages/ReservationPage';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ReservationPage />
                </PersistGate>
            </Provider>
        );
    }
}
export default App;
