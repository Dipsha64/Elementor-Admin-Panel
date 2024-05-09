import './App.css';
import { Outlet } from 'react-router-dom';
import Header from "./components/Header";
import { useSelector } from 'react-redux';
import { isAuthenticated } from './features/Auth/AuthSlice';

function App() {
  const user = useSelector(isAuthenticated);
  return (
    <div>
      {Object.keys(user).length >0 ? <Header/> : ''}
      <main className='bg-slate-50 min-h-[calc(100vh)]'>
        <Outlet/>
      </main>
    </div>
  );
}

export default App;