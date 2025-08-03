export interface User {
  id: string;
  email: string;
  name: string;
  bio: string;
  createdAt: string;
}
export interface Post {
  _id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}
export interface AuthContextType {
  user: User | null;
  loading : boolean,
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, bio: string) => Promise<boolean>;
}