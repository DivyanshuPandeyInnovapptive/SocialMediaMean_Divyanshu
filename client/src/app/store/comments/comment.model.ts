export interface Comment {
  id: string;
  data: string;
  userId: {
    id: string;
    name: string;
    email: string;
  };
  postId: {
    id: string;
  };
  timestamp: string;
}
