import React from "react";
import { user, post, comment } from "./Types/ForumInterfaces";

export const getFullPostWithComments = (
  postInfo: post[],
  userInfo: user[],
  commentInfo: comment[]
): Array<React.ReactNode> => {
  const fullPostArray: Array<JSX.Element> = [];
  postInfo.forEach((post: post) => {
    userInfo.forEach((user: user) => {
      if (user.id === post.userId) {
        fullPostArray.push(
          <div className={"post"} key={post.id}>
            <div className={"title"}>{post.title}</div>
            <div className={"username"}>{user.name}</div>
            <div className={"body"}>{post.body}</div>
            <div>{getUsersComments(post, commentInfo)}</div>
          </div>
        );
      }
    });
  });
  return fullPostArray;
};

const getUsersComments = (
  post: post,
  commentInfo: comment[]
): Array<React.ReactNode> => {
  const commentsArr: Array<JSX.Element> = [];
  commentInfo.forEach((comment: comment) => {
    if (post.id === comment.postId) {
      commentsArr.push(
        <div className={"commentSection"} key={comment.id}>
          <li>{comment.name}</li>
          <li>{comment.body}</li>
        </div>
      );
    }
  });
  return commentsArr;
};
