import { Navigate, useRoutes } from "react-router-dom";
import AllPosts from "./AllPosts";
import pageNotFound from "./ErrorHandling";
import { withHello, withFetchAndHello } from "./HOCs";
import SinglePost from "./SinglePost";

export const helloMessage = "Hello from";

export default function MainAppWithRoutes() {
  const AllPostsWithHoc = withFetchAndHello(AllPosts);
  const SinglePostWithHoc = withFetchAndHello(SinglePost);
  const PathNotFoundWithHoc = withHello(pageNotFound);

  return useRoutes([
    {
      path: "/posts",
      element: <AllPostsWithHoc helloMessage={helloMessage} />,
    },
    {
      path: `/post/:postId`,
      element: <SinglePostWithHoc helloMessage={helloMessage} />,
    }, // (\\d+) Regex for numbers only?
    /** Default navigation to /posts */
    { path: "/", element: <Navigate to="/posts" /> },
    /** Non-existent path */
    { path: "*", element: <PathNotFoundWithHoc helloMessage={helloMessage} /> },
  ]);
}
