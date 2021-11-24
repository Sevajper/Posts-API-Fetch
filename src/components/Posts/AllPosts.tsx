import { getAllPostsWithComments, getFilteredPosts } from "./HandlePostInfo";
import { allPosts } from "../types/PostInterfaces";
import "./AllPosts.styles.css";
import { useState, useEffect } from "react";

const AllPosts = (props: allPosts): JSX.Element => {
  useEffect(
    () => console.log(`${props.helloMessage} ${props.componentName}`),
    [props.helloMessage, props.componentName]
  );

  const [searchInput, setSearchInput] = useState("");
  const [commentIdArr, setCommentIdArr] = useState([-1]);

  /**
   * Checks whether to show comments for each post or not.
   */
  const toggleComment = (postId: number) => {
    !commentIdArr.includes(postId)
      ? setCommentIdArr((prevArray) => [...prevArray, postId])
      : setCommentIdArr((prevArray) => prevArray.filter((id) => id !== postId));
  };

  const searchInputOnChange = (event: any) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className={"allPosts"}>
      <input
        className={"searchInput"}
        value={searchInput}
        onChange={searchInputOnChange}
        placeholder="Search by username, name, email"
      />
      {!searchInput
        ? getAllPostsWithComments(toggleComment, commentIdArr, props)
        : getFilteredPosts(toggleComment, commentIdArr, searchInput, props)}
    </div>
  );
};

export default AllPosts;
