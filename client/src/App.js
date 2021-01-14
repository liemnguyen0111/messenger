import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/Home'

function App() {
  return (
   <Router key='r'>
     <Switch key='s'>
       <Route path='/' component= {Home} key='h'/>
     </Switch>
   </Router>
  );
}

export default App;
