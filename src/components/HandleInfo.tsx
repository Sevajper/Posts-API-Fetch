import React from "react";
import { user, post, comment } from "./types/PostInterfaces";
import { openPost } from "./OpenNewPage";

const getFullPostWithComments = (
  postInfo: post[],
  userInfo: user[],
  commentInfo: comment[],
  toggleComment: (postId: number) => void,
  openComment: number[]
): Array<JSX.Element> => {
  const fullPostArray: Array<JSX.Element> = [];

  postInfo.forEach((post: post) => {
    userInfo.forEach((user: user) => {
      if (user.id === post.userId) {
        fullPostArray.push(
          <div className={"postWrapper"} key={post.id}>
            <div className={"post"}>
              <div className={"header"} onClick={() => openPost(post.id)}>
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
  return fullPostArray;
};

const getUsersComments = (
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

export default getFullPostWithComments;
