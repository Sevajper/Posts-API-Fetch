import { Navigate, useRoutes } from "react-router-dom";
import AllPosts from "./AllPosts";
import SinglePost from "./SinglePost";
import pageNotFound from "./ErrorHandling";
import withHello from "./HOCs";

export default function MainAppWithRoutes() {
  const AllPostsWithHoc = withHello(AllPosts);
  const SinglePostWithHoc = withHello(SinglePost);
  const PathNotFoundWithHoc = withHello(pageNotFound);

  return useRoutes([
    { path: "/posts", element: <AllPostsWithHoc /> },
    { path: "/post/:id", element: <SinglePostWithHoc /> }, // (\\d+) Regex for numbers only?
    /** Default navigation to /posts */
    { path: "/", element: <Navigate to="/posts" /> },
    /** Non-existent path */
    { path: "*", element: <PathNotFoundWithHoc /> },
  ]);
}
