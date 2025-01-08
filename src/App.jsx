import { Routes, Route } from "react-router";
import { useState } from "react";
import Welcome from "./pages/Welcome";
import CalendarPage from "./pages/CalendarPage";
import BraindumpPage from "./pages/BraindumpPage";
import TodoPage from "./pages/TodoPage";
import AuthPage from "./pages/AuthPage";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  return (
    <>
      {user ? (
        <>
          <Nav />
          <h1>Hi {user.name}</h1>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/braindump" element={<BraindumpPage />} />
            <Route path="/todo" element={<TodoPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </>
  );
}

export default App;
