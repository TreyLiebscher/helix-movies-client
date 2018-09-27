// import React from 'react';
// import ReactDOM from 'react-dom';
// import {BrowserRouter as Router} from 'react-router-dom';
// import {Provider} from 'react-redux';
// import './index.css';
// import App from './components/app'
// import store from './store';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(
//     <Provider store={store}>
//         <Router>
//             <App />
//         </Router>
//     </Provider>,
//     document.getElementById('root')
// );
// registerServiceWorker();
//t
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();