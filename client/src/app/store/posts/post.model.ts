export interface Post {
  id: string;
  title: string;
  description: string;
  userId: string;
  comments: [string];
  timestamp: string;
  loading: boolean;
}
