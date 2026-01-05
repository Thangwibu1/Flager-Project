export interface UserProfileResponse{
  id: string,
  username: string,
  avatar: string,
  email: string,
  phone: string,
  bio: string,
  location: string,
  website: string,
  createdAt: string,
  updatedAt: string,
}

export interface MyProfile {
  id: string,
  username: string,
  email: string,
  phone: string,
}