import mongoose, { Schema, Document } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
  size: number;
  industry: string;
  hqLocation: string;
  primaryInterviewTypes: string[];
  integrationPreferences: string[];
  defaultTimezone: string;
  defaultLanguages: string[];
  userId: mongoose.Types.ObjectId; 
}

const OrganizationSchema: Schema = new Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  industry: { type: String, required: true },
  hqLocation: { type: String, required: true },
  primaryInterviewTypes: { type: [String], required: true },
  integrationPreferences: { type: [String], required: true },
  defaultTimezone: { type: String, required: true },
  defaultLanguages: { type: [String], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Organization = mongoose.model<IOrganization>('Organization', OrganizationSchema);

export default Organization;
