import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Posts from "./components/Posts";

export default function App() {
  const [id, setId] = React.useState("5");

  return (
    <Router>
      <div>
        <nav>
          <ul className={"navigationBar"}>
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
          </ul>
        </nav>

        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path={`post/${id}`} element={<Posts />} />
        </Routes>
      </div>
    </Router>
  );
}
