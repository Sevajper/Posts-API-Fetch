import { useEffect, useState } from "react";
import fetchInfo from "./FetchInfo";
import { apiPostsUrl, apiUsersUrl, apiCommentsUrl } from "./Urls";
import getFullPostWithComments from "./HandleInfo";
import { user, post, comment } from "./types/PostInterfaces";
import "./styles/AllPosts.styles.css";

const AllPosts = (): JSX.Element => {
  const [postInfo, setPostInfo] = useState<post[]>([]);
  const [userInfo, setUserInfo] = useState<user[]>([]);
  const [commentInfo, setCommentInfo] = useState<comment[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  const [openComment, setOpenComment] = useState([0]);
  const toggleComment = (postId: number) => {
    !openComment.includes(postId)
      ? setOpenComment((prevArray) => [...prevArray, postId])
      : setOpenComment((prevArray) => prevArray.filter((id) => id !== postId));
  };

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

  if (loading) return <div>"Loading..."</div>; // Skeleton-UI ?
  if (error) return <div>"Error!"</div>;

  return (
    <div className={"allPosts"}>
      {getFullPostWithComments(
        postInfo,
        userInfo,
        commentInfo,
        toggleComment,
        openComment
      )}
    </div>
  );
};

export default AllPosts;
