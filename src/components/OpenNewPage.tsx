import { openPostUrl } from "./Urls";

export const openPost = (postId: number): any => {
  window.open(openPostUrl(postId), "_blank");
};
