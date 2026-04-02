import { model, models, Schema, type Model } from "mongoose";

export type AdminRole = "admin";

export interface AdminDocument {
  name: string;
  email: string;
  passwordHash: string;
  role: AdminRole;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<AdminDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "admin",
      enum: ["admin"],
    },
  },
  {
    timestamps: true,
  }
);

const Admin =
  (models.Admin as Model<AdminDocument>) ||
  model<AdminDocument>("Admin", adminSchema);

export default Admin;
