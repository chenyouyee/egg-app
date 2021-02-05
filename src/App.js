import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';
import { TaskProvider } from './context/taskContext';
import { GoalProvider } from './context/goalContext';
import Home from './pages/Home'
import Goals from './pages/Goals'
import Subgoals from './pages/Subgoals'

function App() {
  return (
    <GoalProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Goals} />
        <Route path ="/subgoals" component={Subgoals} />
      </Switch>
      </BrowserRouter>
    </GoalProvider>
  );
}

export default App;
