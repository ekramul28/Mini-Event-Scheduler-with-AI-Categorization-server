import mongoose from "mongoose";
import config from "../config";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = config.database_url;

    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export { connectDB };

// Seed super admin
import { User } from "../modules/user/user.model";
import { UserRole } from "../modules/auth/auth.types";
// import { UserRole } from "../modules/auth/auth.types";

const superUser = {
  id: "SUPER_ADMIN_001",
  email: "mdekramulhassan168@gmail.com",
  password: config.super_admin_password || "superadmin123",
  role: UserRole.SUPER_ADMIN,
  status: "in-progress",
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExists = await User.findOne({
      role: UserRole.SUPER_ADMIN,
    });

    if (!isSuperAdminExists) {
      await User.create(superUser);
      console.log("Super admin created successfully");
    } else {
      console.log("Super admin already exists");
    }
  } catch (error) {
    console.error("Error seeding super admin:", error);
  }
};

export default seedSuperAdmin;
