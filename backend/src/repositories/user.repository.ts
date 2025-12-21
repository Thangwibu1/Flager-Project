import { User } from "@models/mongodb/User.model";

export class UserRepository {
  async findById(id: string) {
    return await User.findById(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  async create(userData: any) {
    return await User.create(userData);
  }

  async update(id: string, userData: any) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id: string) {
    return await User.findByIdAndDelete(id);
  }
}

export const userRepository = new UserRepository();
