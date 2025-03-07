import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import './index.css'
import App from './App.jsx'
import allReducers from './reducers'
import { Provider } from 'react-redux'

const store = createStore(allReducers);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
