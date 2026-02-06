import { Document, Schema, model } from "mongoose";

// Document
export interface IUser extends Document {
  // I => means interface
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // comparePassword(candidatePassword: string): Promise<boolean>;
}

// Schema
const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const userModel = model<IUser>("User", userSchema);
// export default model<IUser>("User", userSchema);
// OR
// const userModel = model<IUser>("User", userSchema);
// export default userModel;
