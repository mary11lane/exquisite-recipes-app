import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from './routes/Routes.jsx';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
};

export default App;
