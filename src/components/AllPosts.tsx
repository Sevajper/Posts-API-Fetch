import { getAllPostsWithComments, getFilteredPosts } from "./HandlePostInfo";
import { allPosts } from "./types/PostInterfaces";
import "./styles/AllPosts.styles.css";
import { useState, useEffect } from "react";

const AllPosts = (props: allPosts): JSX.Element => {
  useEffect(
    () => console.log(`${props.helloMessage} ${props.componentName}`),
    [props.helloMessage, props.componentName]
  );

  const [searchInput, setSearchInput] = useState("");
  const [openComment, setOpenComment] = useState([0]);

  const toggleComment = (postId: number) => {
    !openComment.includes(postId)
      ? setOpenComment((prevArray) => [...prevArray, postId])
      : setOpenComment((prevArray) => prevArray.filter((id) => id !== postId));
  };

  const searchInputOnChange = (event: any) => {
    console.log(event.target.value);
    setSearchInput(event.target.value);
  };

  return (
    <div className={"allPosts"}>
      <input value={searchInput} onChange={searchInputOnChange} />
      {!searchInput
        ? getAllPostsWithComments(toggleComment, openComment, props)
        : getFilteredPosts(toggleComment, openComment, searchInput, props)}
    </div>
  );
};

export default AllPosts;
