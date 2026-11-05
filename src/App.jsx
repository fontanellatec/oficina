import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/comum.css'
import Rotas from './routes'
import Mecanico from './pages/mecanico/mecanico'
import ErrorBoundary from './hooks/errorBoundary';

const App = () => {
  return ( 
      <ErrorBoundary>
        <Rotas/>
      </ErrorBoundary>
    );
}
 
export default App;