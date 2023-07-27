import React from "react";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Landing from "./components/pages/Landing";
import Board from "./components/pages/Board";
import Dashboard from "./components/pages/Dashboard";
import Issue from "./components/pages/Issue";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/board/:id" element={<Board />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/issue/:id" element={<Issue />} />
          </Routes>
        </>
      </Router>
    </Provider>
  );
}

export default App;
