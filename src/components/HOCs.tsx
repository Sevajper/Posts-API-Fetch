import { useEffect, useState } from "react";
import fetchInfoAndSetLocalStorage from "./FetchInfoAndSetLocalStorage";
import { apiPostsUrl, apiUsersUrl, apiCommentsUrl } from "./Urls";
import { useNavigate, useParams } from "react-router-dom";
import { user, post, comment } from "./types/PostInterfaces";
import PageNotFound from "./ErrorHandling";

const helloMessage = "Hello from";

export const withFetchAndHello =
  (WrappedComponent: any) =>
  ({ ...props }) => {
    const PathNotFoundWithHoc = withHello(PageNotFound);
    const [postInfo, setPostInfo] = useState<post[]>([]);
    const [userInfo, setUserInfo] = useState<user[]>([]);
    const [commentInfo, setCommentInfo] = useState<comment[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    const navigate = useNavigate();
    const { postId } = useParams();

    const allInfo = [postInfo, userInfo, commentInfo];

    useEffect(() => {
      /*
       * Since I know the api won't change it's okay to use
       * local storage and not refetch the data.
       */
      if (
        !localStorage.getItem("post-info") ||
        !localStorage.getItem("user-info") ||
        !localStorage.getItem("comment-info")
      ) {
        (async () => {
          setPostInfo(await fetchInfoAndSetLocalStorage(apiPostsUrl, "post"));
          setUserInfo(await fetchInfoAndSetLocalStorage(apiUsersUrl, "user"));
          setCommentInfo(
            await fetchInfoAndSetLocalStorage(apiCommentsUrl, "comment")
          );
        })()
          .catch((error) => {
            console.error(error);
            setError(error);
            return error;
          })
          .finally(() => setLoading(false));
      } else {
        setPostInfo(JSON.parse(localStorage.getItem("post-info") as string));
        setUserInfo(JSON.parse(localStorage.getItem("user-info") as string));
        setCommentInfo(
          JSON.parse(localStorage.getItem("comment-info") as string)
        );
        setLoading(false);
      }
    }, []);

    if (loading) return <div className="loadingText">Loading...</div>; // Skeleton-UI ?
    if (error) return <PathNotFoundWithHoc helloMessage={helloMessage} />;

    if (postId) {
      // Check if post exists when user manually types postId in url
      const postFound = !!postInfo.find((post) => post.id === Number(postId));

      if (!postFound)
        return <PathNotFoundWithHoc helloMessage={helloMessage} />;
    }

    return (
      <WrappedComponent
        allInfo={allInfo}
        navigate={navigate}
        postId={postId}
        componentName={WrappedComponent.name}
        helloMessage={helloMessage}
        {...props}
      />
    );
  };

export const withHello =
  (WrappedComponent: any, state?: any) =>
  ({ ...props }) => {
    return (
      <WrappedComponent
        componentName={WrappedComponent.name}
        helloMessage={helloMessage}
        fetchedInfo={state}
        {...props}
      />
    );
  };
