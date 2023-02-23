import './App.scss';
import { Route,Routes } from 'react-router-dom';
import Auth from './pages/auth';
import Expenses from './pages/expenses';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Auth/>}/>
        <Route path='/expense' element={<Expenses/>} />
      </Routes>
    </div>
  );
}

export default App;
