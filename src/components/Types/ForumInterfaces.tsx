export interface post {
  title: string;
  body: string;
  userId: number;
  id: number;
}

export interface user {
  id: number;
  name: string;
}

export interface comment {
  postId: number;
  body: string;
  id: number;
  name: string;
}
