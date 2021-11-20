export interface post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface user {
  id: number;
  name: string;
}

export interface comment {
  id: number;
  postId: number;
  name: string;
  body: string;
}
