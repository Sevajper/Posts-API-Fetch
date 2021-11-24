import React from "react";
import {
  user,
  post,
  comment,
  allPosts,
  singlePost,
} from "../types/PostInterfaces";

/**
 * Shows all posts from https://jsonplaceholder.typicode.com/posts
 * or filtered posts if filteredUserInfoArray exists.
 *
 * With a big number of posts we would limit the ones we show at a time with page numbers,
 * but that is not needed for 100 posts.
 * @return An array of JSX.Elements or "No results found"
 */
export const getAllPostsWithComments = (
  toggleComment: (postId: number) => void,
  commentIdArr: number[],
  { allInfo, navigate }: allPosts,
  filteredUserInfoArray?: user[]
) => {
  const postInfo = allInfo[0];
  const commentInfo = allInfo[2];
  let userInfo: user[];

  !filteredUserInfoArray
    ? (userInfo = allInfo[1])
    : (userInfo = filteredUserInfoArray);

  const allPostsArray: Array<JSX.Element> = [];

  postInfo.forEach((post: post) => {
    userInfo.forEach((user: user) => {
      if (user.id === post.userId) {
        allPostsArray.push(
          <div className={"postWrapper"} key={post.id}>
            <div className={"post"}>
              <div
                className={"header"}
                onClick={() =>
                  navigate(`/post/${post.id}`, {
                    state: {
                      user: user,
                      post: post,
                      commentInfo: commentInfo,
                    },
                  })
                }
              >
                <div className={"title"}>{post.title}</div>
                <div className={"username"}>{user.name}</div>
                <div className={"separator"} />
                <div className={"postBody"}>{post.body}</div>
              </div>

              <div
                className={"toggleCommentsButton"}
                onClick={() => toggleComment(post.id)}
              >
                Comments
              </div>

              {commentIdArr.includes(post.id) && (
                <div className={"commentSection"}>
                  <div className={"commentTitle"}>Comments</div>
                  <div className={"commentSeparator"} />
                  {getUsersComments(post.id, commentInfo)}
                </div>
              )}
            </div>
          </div>
        );
      }
    });
  });

  return allPostsArray.length ? (
    allPostsArray
  ) : (
    <div className="noResultsSearch">No results found...</div>
  );
};

/**
 * Shows a single post with comments based on postId.
 * If the info has already been fetched from AllPosts and the user just clicked a post
 * we do not refetch but rather send down the post and user with fetchedInfo.
 * If the user input the postid in the url by themselves we search for it in allInfo
 * which has all the posts, users and comments.
 * @return An array of JSX.Elements or "No results found"
 */
export const getSinglePostWithComments = ({
  allInfo,
  postId,
  fetchedInfo,
}: singlePost) => {
  const singlePostArray: JSX.Element[] = [];

  if (fetchedInfo) {
    return handleSinglePostWithComments(fetchedInfo);
  }

  const [postInfo, userInfo, commentInfo] = allInfo;

  const post = postInfo.find((post: post) => {
    return post.id === Number(postId);
  });

  if (post)
    userInfo.forEach((user: user) => {
      if (user.id === post.userId) {
        fetchedInfo = { post, user, commentInfo };
        singlePostArray.push(handleSinglePostWithComments(fetchedInfo));
      }
    });

  return singlePostArray;
};

export const handleSinglePostWithComments = (
  info: singlePost["fetchedInfo"]
) => {
  return (
    <div className={"postWrapper"} key={info.post.id}>
      <div className={"post"}>
        <div className={"singlePostHeader"}>
          <div className={"title"}>{info.post.title}</div>
          <div className={"username"}>{info.user.name}</div>
          <div className={"separator"} />
          <div className={"postBody"}>{info.post.body}</div>
        </div>
        <div className={"commentSection"}>
          <div className={"commentTitle"}>Comments</div>
          <div className={"commentSeparator"} />
          {getUsersComments(info.post.id, info.commentInfo)}
        </div>
      </div>
    </div>
  );
};

export const getUsersComments = (
  postId: number,
  commentInfo: comment[],
  isFetchedSingleComment: boolean = false
): Array<React.ReactNode> => {
  const commentsArr: Array<JSX.Element> | Array<number> = [];

  commentInfo.forEach((comment: comment) => {
    if (postId === comment.postId) {
      !isFetchedSingleComment
        ? (commentsArr as Array<JSX.Element>).push(
            <div className={"comment"} key={comment.id}>
              <div className={"commentName"}>{comment.name}</div>
              <div className={"commentBody"}>{comment.body}</div>
            </div>
          )
        : (commentsArr as Array<number | string>).push(
            comment.id,
            comment.name,
            comment.body
          );
    }
  });
  return commentsArr;
};

/**
 * Filters userInfo according to search input.
 * @return getAllPostsWithComments function with filtered array of posts as input.
 */
export const getFilteredPosts = (
  toggleComment: (postId: number) => void,
  commentIdArr: number[],
  searchInput: string,
  props: allPosts
) => {
  const userInfo = props.allInfo[1];
  const filteredUserInfoArray: user[] = [];

  userInfo.filter((user: user) =>
    Object.keys(user).forEach(() => {
      if (
        (String(user["name"]).includes(searchInput) ||
          String(user["username"]).includes(searchInput) ||
          String(user["email"]).includes(searchInput)) &&
        !filteredUserInfoArray.find((userObj) => userObj.id === user.id)
      ) {
        filteredUserInfoArray.push(user);
      }
    })
  );

  return getAllPostsWithComments(
    toggleComment,
    commentIdArr,
    props,
    filteredUserInfoArray
  );
};
