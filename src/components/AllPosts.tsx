import { getAllPostsWithComments } from "./HandlePostInfo";
import { allPosts } from "./types/PostInterfaces";
import "./styles/AllPosts.styles.css";
import { useState, useEffect } from "react";

const AllPosts = (props: allPosts): JSX.Element => {
  useEffect(
    () => console.log(`${props.helloMessage} ${props.componentName}`),
    [props.helloMessage, props.componentName]
  );

  const [openComment, setOpenComment] = useState([0]);
  const toggleComment = (postId: number) => {
    !openComment.includes(postId)
      ? setOpenComment((prevArray) => [...prevArray, postId])
      : setOpenComment((prevArray) => prevArray.filter((id) => id !== postId));
  };
  return (
    <div className={"allPosts"}>
      {getAllPostsWithComments(toggleComment, openComment, props)}
    </div>
  );
};

export default AllPosts;
