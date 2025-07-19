import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "../modules/auth/auth.types";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  studentId?: string;
  teacherId?: string;
  staffId?: string;
  department?: string;
  batch?: string;
  semester?: number;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: Date;
  gender?: "male" | "female" | "other";
  profileImage?: string;
  // Teacher specific fields
  specialization?: string;
  qualification?: string;
  subjects?: string[];
  joiningDate?: Date;
  experience?: number;
  designation?: string;
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: Object.values(UserRole),
    },
    // Common optional fields
    phoneNumber: String,
    address: String,
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    profileImage: String,

    // Student specific fields
    studentId: String,
    batch: String,
    semester: {
      type: Number,
      min: 1,
      max: 8,
    },

    // Teacher specific fields
    teacherId: String,
    department: String,
    specialization: String,
    qualification: String,
    subjects: [String],
    joiningDate: Date,
    experience: Number,
    designation: String,

    // Staff specific fields
    staffId: String,
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ studentId: 1 });
UserSchema.index({ teacherId: 1 });
UserSchema.index({ staffId: 1 });
UserSchema.index({ department: 1 });

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

export const User = mongoose.model<IUser>("User", UserSchema);
