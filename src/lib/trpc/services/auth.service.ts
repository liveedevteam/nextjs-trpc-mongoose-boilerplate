import crypto from "crypto";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import { connectToDatabase } from "@/lib/db/connect";
import Admin from "@/lib/db/models/admin";
import PasswordResetToken from "@/lib/db/models/password-reset-token";
import type {
  ForgotPasswordInput,
  VerifyResetTokenInput,
  ResetPasswordInput,
  ChangePasswordInput,
} from "../schemas";

/**
 * Auth Service
 * Handles all authentication-related business logic
 */

export interface CurrentAdminDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

/**
 * Get current admin by ID
 */
export async function getCurrentAdmin(adminId: string): Promise<CurrentAdminDTO> {
  await connectToDatabase();

  const admin = await Admin.findById(adminId);
  if (!admin) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Admin not found",
    });
  }

  return {
    id: admin._id.toString(),
    name: admin.name,
    email: admin.email,
    createdAt: admin.createdAt,
  };
}

/**
 * Request password reset
 */
export async function requestPasswordReset(input: ForgotPasswordInput) {
  await connectToDatabase();

  const admin = await Admin.findOne({ email: input.email.toLowerCase() });

  // Always return success to prevent email enumeration
  if (!admin) {
    return {
      success: true,
      message: "If an account exists with this email, a reset link has been generated.",
    };
  }

  // Delete any existing tokens for this admin
  await PasswordResetToken.deleteMany({ adminId: admin._id });

  // Generate new token
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await PasswordResetToken.create({
    adminId: admin._id,
    token,
    expiresAt,
  });

  // In a real application, you would send this via email
  // For now, we'll return it (in production, remove this!)
  console.log(`Password reset token for ${input.email}: ${token}`);

  return {
    success: true,
    message: "If an account exists with this email, a reset link has been generated.",
    // NOTE: In production, remove the token from the response and send via email instead
    token, // Only for development/testing
  };
}

/**
 * Verify reset token is valid
 */
export async function verifyResetToken(input: VerifyResetTokenInput) {
  await connectToDatabase();

  const resetToken = await PasswordResetToken.findOne({
    token: input.token,
    expiresAt: { $gt: new Date() },
  });

  if (!resetToken) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Invalid or expired reset token",
    });
  }

  return { valid: true };
}

/**
 * Reset password using token
 */
export async function resetPassword(input: ResetPasswordInput) {
  await connectToDatabase();

  const resetToken = await PasswordResetToken.findOne({
    token: input.token,
    expiresAt: { $gt: new Date() },
  });

  if (!resetToken) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Invalid or expired reset token",
    });
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(input.password, salt);

  // Update the admin's password
  await Admin.findByIdAndUpdate(resetToken.adminId, {
    password: hashedPassword,
  });

  // Delete the used token
  await PasswordResetToken.deleteOne({ _id: resetToken._id });

  return {
    success: true,
    message: "Password has been reset successfully",
  };
}

/**
 * Change password for logged-in user
 */
export async function changePassword(adminId: string, input: ChangePasswordInput) {
  await connectToDatabase();

  const admin = await Admin.findById(adminId).select("+password");
  if (!admin) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Admin not found",
    });
  }

  // Verify current password
  const isValid = await admin.comparePassword(input.currentPassword);
  if (!isValid) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Current password is incorrect",
    });
  }

  // Hash and save new password
  const salt = await bcrypt.genSalt(12);
  admin.password = await bcrypt.hash(input.newPassword, salt);
  await admin.save({ validateBeforeSave: false });

  return {
    success: true,
    message: "Password changed successfully",
  };
}

