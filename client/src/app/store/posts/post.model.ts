export interface Post {
  id: string;
  title: string;
  description: string;
  userId: {
    id: string;
    name: string;
    email: string;
  };
  comments: [
    {
      id: string;
      data: string;
      userId: {
        id: string;
        name: string;
        email: string;
      };
      timestamp: string;
    }
  ];
  timestamp: string;
  loading: boolean;
}
