import React from "react";
import { user, post, comment } from "./types/PostInterfaces";
import { openPost } from "./OpenNewPage";

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
          <div className={"postWrapper"} key={post.id}>
            <div className={"post"}>
              <div className={"header"}>
                <div className={"title"} onClick={() => openPost(post.id)}>
                  {post.title}
                </div>
                <div className={"username"}>{user.name}</div>
                <div className={"separator"} />
                <div className={"postBody"}>{post.body}</div>
              </div>
              <div className={"commentSection"}>
                <div className={"commentTitle"}>Comments</div>
                <div className={"commentSeparator"} />
                {getUsersComments(post, commentInfo)}
              </div>
            </div>
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
        <div className={"comment"} key={comment.id}>
          <div className={"commentName"}>{comment.name}</div>
          <div className={"commentBody"}>{comment.body}</div>
        </div>
      );
    }
  });
  return commentsArr;
};
