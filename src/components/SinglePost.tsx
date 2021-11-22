import { getSinglePostWithComments } from "./HandlePostInfo";
import { singlePost } from "./types/PostInterfaces";
import { useEffect } from "react";

const SinglePost = (props: singlePost): JSX.Element => {
  useEffect(
    () => console.log(`${props.helloMessage} ${props.componentName}`),
    [props.helloMessage, props.componentName]
  );

  return <div className="allPosts"> {getSinglePostWithComments(props)}</div>;
};

export default SinglePost;
