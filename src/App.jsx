import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import TimerPage from "./pages/TimerPage";
import TodoPage from "./pages/TodoPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <header className="navbar">
          <h2>My Productivity App</h2>

          <nav>
            <NavLink to="/" end>
              Focus Timer
            </NavLink>

            <NavLink to="/todo">
              My To-Do
            </NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<TimerPage />} />
            <Route path="/todo" element={<TodoPage />} />
          </Routes>
        </main>

        <footer>
          <p>Stay focused. Stay productive.</p>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;