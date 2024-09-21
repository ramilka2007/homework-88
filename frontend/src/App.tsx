import {Route, Routes} from 'react-router-dom';
import './App.css';
import Toolbar from "./UI/Toolbar/Toolbar";
import Home from "./containers/Home/Home";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import AddNewPost from "./containers/AddNewPost/AddNewPost";

const App = () => {
  return (
      <>
        <header>
          <Toolbar/>
        </header>
        <main className="mt-5">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
              <Route path="/new-post" element={<AddNewPost/>}/>
            <Route path="*" element={(<h1>Not found</h1>)}/>
          </Routes>
        </main>

      </>
  );
};

export default App;