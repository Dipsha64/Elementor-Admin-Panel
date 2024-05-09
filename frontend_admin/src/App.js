import './App.css';
import { Outlet } from 'react-router-dom';
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header/>
      <main className='bg-slate-50 min-h-[calc(100vh)]'>
        <Outlet/>
      </main>
    </div>
  );
}

export default App;