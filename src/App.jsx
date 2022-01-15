import Main from './components/Main'
import Reminder from './components/Reminder'

import './App.scss'

function App() {
  return (
    <div className="App bg-dark">
      <Reminder />
      <Main />      
    </div>
  );
}

export default App;
