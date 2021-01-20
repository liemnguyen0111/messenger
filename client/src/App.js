import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/Home'
import Background from './components/Background'
import './index.css'
import './styles/Style.css'

function App() {
  return (
   <Router key='r'>
           <Background/>
     <Switch key='s'>
       <Route path='/' component= {Home} key='h'/>
     </Switch>
   </Router>
  );
}

export default App;
