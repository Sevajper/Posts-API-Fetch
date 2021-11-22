import { useEffect, useState } from "react";
import fetchPostInfo from "./FetchPostInfo";
import { apiPostsUrl, apiUsersUrl, apiCommentsUrl } from "./Urls";
import { useNavigate, useParams } from "react-router-dom";
import { user, post, comment } from "./types/PostInterfaces";
import PageNotFound from "./ErrorHandling";
import { helloMessage } from "./MainAppWithRoutes";

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
      (async () => {
        setPostInfo(await fetchPostInfo(apiPostsUrl));
        setUserInfo(await fetchPostInfo(apiUsersUrl));
        setCommentInfo(await fetchPostInfo(apiCommentsUrl));
      })()
        .catch((error) => {
          console.error(error);
          setError(error);
          return error;
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

    if (loading) return <div>"Loading..."</div>; // Skeleton-UI ?
    if (error) return <div>"Error!"</div>;

    if (postId) {
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
        {...props}
      />
    );
  };

export const withHello =
  (WrappedComponent: any) =>
  ({ ...props }) => {
    return (
      <WrappedComponent componentName={WrappedComponent.name} {...props} />
    );
  };
