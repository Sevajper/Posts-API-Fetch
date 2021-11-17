import { useEffect, useState } from "react";
import fetchInfo from "./FetchInfo";
import { apiPostsUrl, apiUsersUrl, apiCommentsUrl } from "./Urls";
import { getFullPostWithComments } from "./GetFunctions";
import { user, post, comment } from "./Types/ForumInterfaces";
import "./Posts.styles.css";

const Posts = (): JSX.Element => {
  const [postInfo, setPostInfo] = useState<post[]>([]);
  const [userInfo, setUserInfo] = useState<user[]>([]);
  const [commentInfo, setCommentInfo] = useState<comment[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    (async () => {
      setPostInfo(await fetchInfo(apiPostsUrl));
      setUserInfo(await fetchInfo(apiUsersUrl));
      setCommentInfo(await fetchInfo(apiCommentsUrl));
    })()
      .catch((error) => {
        console.error(error);
        setError(error);
        return error;
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>"Error!"</div>;

  return (
    <div>
      <div>{getFullPostWithComments(postInfo, userInfo, commentInfo)}</div>
    </div>
  );
};

export default Posts;
