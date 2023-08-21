import { useDispatch, useSelector } from "react-redux";
import {
    loggedInAction,
    loggedOutAction
} from "./state/actions";

// Pages
import AdminPage from "./pages/AdminPage";

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    return (
        <div className="App">
            <h1>The Movies App</h1>
            {!user.isLoggedIn ? (
                <>
                    <button onClick={() => dispatch(loggedInAction("User"))}>Login as User</button>
                    <button onClick={() => dispatch(loggedInAction("Admin"))}>Login as Admin</button>
                </>
            ) : (
                <button onClick={() => dispatch(loggedOutAction())}>Logout</button>
            )}
            {user.isLoggedIn && <AdminPage />}
        </div>
    )
}

export default App;