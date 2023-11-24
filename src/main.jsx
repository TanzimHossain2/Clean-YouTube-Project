
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store/index.js'
import { StoreProvider } from 'easy-peasy'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreProvider store={store}>
    <App />
    </StoreProvider>
  </BrowserRouter>,
)
