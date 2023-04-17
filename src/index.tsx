import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import './index.css';
import {store} from './store/store';
import {AppRouter} from './app-router';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <Provider store={store}>
        <AppRouter data-test-id='app'/>
    </Provider>
);
