import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Posts from "./components/Posts";

export default function App() {
  const [id, setId] = React.useState("5");

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
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
