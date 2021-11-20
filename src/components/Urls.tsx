export const apiPostsUrl = "https://jsonplaceholder.typicode.com/posts";
export const apiUsersUrl = "https://jsonplaceholder.typicode.com/users";
export const apiCommentsUrl = "https://jsonplaceholder.typicode.com/comments";
export const openPostUrl = (id: number) =>
  `${window.location.origin}/post/${id}`;
