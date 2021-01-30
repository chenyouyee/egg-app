import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { TaskProvider } from './context/taskContext';
import Home from './pages/Home'

function App() {
  return (
    <TaskProvider>
      <Home />
    </TaskProvider>
  );
}

export default App;
