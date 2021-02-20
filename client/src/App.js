import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';
import { GoalProvider } from './context/goalContext';
import { SubgoalProvider } from './context/subgoalContext';
import Goals from './pages/Goals'
import Subgoals from './pages/Subgoals'

function App() {
  return (
    <SubgoalProvider>
      <GoalProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Goals} />
            <Route path ="/subgoals" component={Subgoals} />
          </Switch>
        </BrowserRouter>
      </GoalProvider>
    </SubgoalProvider>
  );
}

export default App;
