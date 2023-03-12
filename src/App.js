import logo from './logo.svg';
import './App.css';
import { ToDoList } from './components/ToDoList';
import { observableToDoStore } from "./stores/ToDoStore";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        
        <ToDoList ToDoStore={observableToDoStore}></ToDoList>
      </header>
    </div>
  );
}

export default App;
