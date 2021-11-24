import { NavigateFunction } from "react-router-dom";

export interface allPosts extends componentHello {
  allInfo: [post[], user[], comment[]];
  navigate: NavigateFunction;
}

export interface singlePost extends componentHello {
  allInfo: [post[], user[], comment[]];
  postId: number;
  fetchedInfo: { post: post; user: user; commentInfo: comment[] };
}

export interface post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface user {
  id: number;
  username: string;
  name: string;
  email: string;
}

export interface comment {
  id: number;
  postId: number;
  name: string;
  body: string;
}

export interface componentHello {
  helloMessage: string;
  componentName: string;
}
