import mongoose, { Document } from 'mongoose';

export type LeadStatus = 'New' | 'Engaged' | 'Proposal Sent' | 'Closed-Won' | 'Closed-Lost';

export interface ILead extends Document {
  name: string;
  email: string;
  status: LeadStatus;
  createdAt: Date;
}

const leadSchema = new mongoose.Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    status: {
      type: String,
      enum: ['New', 'Engaged', 'Proposal Sent', 'Closed-Won', 'Closed-Lost'],
      default: 'New',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Lead = mongoose.model<ILead>('Lead', leadSchema); 