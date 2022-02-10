import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./components/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/login" /> : <Register />}
        </Route>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/messenger">{user ? <Messenger /> : <Login />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
