
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store/index.js'
import { StoreProvider } from 'easy-peasy'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <StoreProvider store={store}>
    <App />
    </StoreProvider>
  </>,
)
