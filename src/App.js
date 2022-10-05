import Contact from "./components/Contact";
import Result from "./components/Result";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

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
						{/* <Route component={page404} /> */}
					</Switch>
				</BrowserRouter>
			</div>
		</AuthProvider>
	);
}

export default App;
