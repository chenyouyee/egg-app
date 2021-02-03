import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { TaskProvider } from './context/taskContext';
import { GoalProvider } from './context/goalContext';
import Home from './pages/Home'
import Goals from './pages/Goals'

function App() {
  return (
    <GoalProvider>
      <Goals />
    </GoalProvider>
  );
}

export default App;
