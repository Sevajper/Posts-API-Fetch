import React from "react";
import {
  user,
  post,
  comment,
  allPosts,
  singlePost,
} from "./types/PostInterfaces";

export const getAllPostsWithComments = (
  toggleComment: (postId: number) => void,
  openComment: number[],
  { allInfo, navigate }: allPosts,
  filteredUserInfoArray?: number[]
) => {
  const postInfo = allInfo[0];
  const commentInfo = allInfo[2];
  let userInfo: any;

  !filteredUserInfoArray
    ? (userInfo = allInfo[1])
    : (userInfo = filteredUserInfoArray);

  const allPostsArray: Array<JSX.Element> = [];
  console.log(filteredUserInfoArray);

  postInfo.forEach((post: post) => {
    userInfo.forEach((user: user) => {
      if (user.id === post.userId) {
        allPostsArray.push(
          <div className={"postWrapper"} key={post.id}>
            <div className={"post"}>
              <div
                className={"header"}
                onClick={() => navigate(`/post/${post.id}`)}
              >
                {getSinglePost(post, user)}
              </div>

              <div
                className={"toggleCommentsButton"}
                onClick={() => toggleComment(post.id)}
              >
                Comments
              </div>

              {openComment.includes(post.id) && (
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

  return allPostsArray;
};

export const getSinglePostWithComments = ({ allInfo, postId }: singlePost) => {
  const singlePostArray: JSX.Element[] = [];
  const [postInfo, userInfo, commentInfo] = allInfo;

  const post = postInfo.find((post: post) => {
    return post.id === Number(postId);
  });

  if (post)
    userInfo.forEach((user: user) => {
      if (user.id === post.userId) {
        singlePostArray.push(
          <div className={"postWrapper"} key={post.id}>
            <div className={"post"}>
              <div className={"singlePostHeader"}>
                {getSinglePost(post, user)}
              </div>
              <div className={"commentSection"}>
                <div className={"commentTitle"}>Comments</div>
                <div className={"commentSeparator"} />
                {getUsersComments(post.id, commentInfo)}
              </div>
            </div>
          </div>
        );
      }
    });

  return singlePostArray;
};

export const getUsersComments = (
  postId: number,
  commentInfo: comment[]
): Array<React.ReactNode> => {
  const commentsArr: Array<JSX.Element> = [];

  commentInfo.forEach((comment: comment) => {
    if (postId === comment.postId) {
      commentsArr.push(
        <div className={"comment"} key={comment.id}>
          <div className={"commentName"}>{comment.name}</div>
          <div className={"commentBody"}>{comment.body}</div>
        </div>
      );
    }
  });
  return commentsArr;
};

export const getSinglePost = (post: post, user: user) => {
  return (
    <>
      <div className={"title"}>{post.title}</div>
      <div className={"username"}>{user.name}</div>
      <div className={"separator"} />
      <div className={"postBody"}>{post.body}</div>
    </>
  );
};

export const getFilteredPosts = (
  toggleComment: (postId: number) => void,
  openComment: number[],
  searchInput: string,
  props: allPosts
) => {
  const userInfo = props.allInfo[1];
  const filteredUserInfoArray: any[] = [];

  userInfo.filter((user: any) =>
    Object.keys(user).forEach((key) => {
      if (
        String(user[key]).includes(searchInput) &&
        !filteredUserInfoArray.find((userObj) => userObj.id === user.id)
      ) {
        filteredUserInfoArray.push(user);
      }
    })
  );

  return getAllPostsWithComments(
    toggleComment,
    openComment,
    props,
    filteredUserInfoArray
  );
};
