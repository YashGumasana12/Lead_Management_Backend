import mongoose from 'mongoose';
import { Lead } from '../models/lead.model';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lead-manager';

async function reindexDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Drop existing indexes
    await Lead.collection.dropIndexes();
    console.log('Dropped existing indexes');

    // Find duplicate emails
    const duplicates = await Lead.aggregate([
      {
        $group: {
          _id: { email: { $toLower: "$email" } },
          count: { $sum: 1 },
          docs: { $push: { _id: "$_id", email: "$email", name: "$name" } }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]);

    // Log duplicates found
    if (duplicates.length > 0) {
      console.log('Found duplicate emails:');
      for (const dup of duplicates) {
        console.log(`\nEmail: ${dup._id.email}`);
        console.log('Duplicate records:');
        dup.docs.forEach((doc: any) => {
          console.log(`- ID: ${doc._id}, Name: ${doc.name}, Email: ${doc.email}`);
        });
      }

      // Keep the first occurrence of each duplicate and remove others
      for (const dup of duplicates) {
        const [keep, ...remove] = dup.docs;
        console.log(`\nKeeping record for ${keep.email} with ID: ${keep._id}`);
        for (const doc of remove) {
          await Lead.findByIdAndDelete(doc._id);
          console.log(`Deleted duplicate record with ID: ${doc._id}`);
        }
      }
    } else {
      console.log('No duplicate emails found');
    }

    // Create new indexes
    await Lead.collection.createIndex({ email: 1 }, { unique: true });
    console.log('Created new unique index on email field');

    console.log('Database reindexing completed successfully');
  } catch (error) {
    console.error('Error during reindexing:', error);
  } finally {
    await mongoose.disconnect();
  }
}

reindexDatabase(); 