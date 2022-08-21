
import './App.css';
import Routers from './Routers';
import { connect } from 'react-redux'
import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <SnackbarProvider anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}>
      <Routers></Routers>
    </SnackbarProvider>
  );
}

export default App;
