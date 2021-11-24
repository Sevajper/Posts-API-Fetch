import { Navigate, useRoutes, useLocation } from "react-router-dom";
import AllPosts from "./AllPosts";
import pageNotFound from "./ErrorHandling";
import { withHello, withFetchAndHello } from "./HOCs";
import SinglePost from "./SinglePost";

export default function MainAppWithRoutes() {
  const location = useLocation();

  const AllPostsWithHoc = withFetchAndHello(AllPosts);
  const SinglePostWithHoc =
    location.state?.post && location.state?.user && location.state?.commentInfo
      ? withHello(SinglePost, location.state)
      : withFetchAndHello(SinglePost);
  const PathNotFoundWithHoc = withHello(pageNotFound);

  return useRoutes([
    {
      path: "/posts",
      element: <AllPostsWithHoc />,
    },
    {
      path: `/post/:postId`,
      element: <SinglePostWithHoc />,
    }, // (\\d+) Regex for numbers only?
    /** Default navigation to /posts */
    { path: "/", element: <Navigate to="/posts" /> },
    /** Non-existent path */
    { path: "*", element: <PathNotFoundWithHoc /> },
  ]);
}
