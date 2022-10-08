import Contact from "./components/Contact";
import Result from "./components/Result";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PasswordReset from "./components/PasswordReset";
import Page404 from "./components/Page404";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Contact} />
            <Route path="/result/" component={Result} />
            <Route path="/signup/" component={Signup} />
            <Route path="/login/" component={Login} />
            <Route path="/password-reset/" component={PasswordReset} />
            <Route component={Page404} />
          </Switch>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
