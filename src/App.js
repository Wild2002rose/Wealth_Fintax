import Nav from "./Components/NavComponent/Nav";
import ChatBox from "./Components/Chat/ChatBox";
import './App.css';
import Home from "./Components/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter className="App">
      <Home/>
      <ChatBox/>
    </BrowserRouter>
  );
}

export default App;
