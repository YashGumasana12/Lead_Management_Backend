import { Request, Response } from 'express';
import { Lead } from '../models/lead.model';

export const leadController = {
  // Get all leads
  getAllLeads: async (req: Request, res: Response): Promise<Response> => {
    try {
      const leads = await Lead.find().sort({ createdAt: -1 });
      return res.json(leads);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching leads', error });
    }
  },

  // Create a new lead
  createLead: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, email, status } = req.body;

      // Check if lead with email already exists
      const existingLead = await Lead.findOne({ email });
      console.log('Existing lead:', existingLead);
      if (existingLead) {
        return res.status(400).json({ message: 'Lead with this email already exists' });
      }

      const lead = new Lead({
        name,
        email,
        status,
      });

      const savedLead = await lead.save();
      return res.status(201).json(savedLead);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating lead', error });
    }
  },

  // Get a single lead by ID
  getLeadById: async (req: Request, res: Response): Promise<Response> => {
    try {
      const lead = await Lead.findOne({ _id: req.params.id });
      if (!lead) {
        return res.status(404).json({ message: 'Lead not found' });
      }
      return res.json(lead);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching lead', error });
    }
  },

  // Update a lead
  updateLead: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, email, status } = req.body;
      console.log('Update request:', { id: req.params.id, body: req.body });
      
      const lead = await Lead.findOne({ _id: req.params.id });
      console.log('Found lead:', lead);

      if (!lead) {
        return res.status(404).json({ message: 'Lead not found' });
      }

      // Check if email is being changed and if it's already taken
      if (email && email !== lead.email) {
        const existingLead = await Lead.findOne({ email });
        if (existingLead) {
          return res.status(400).json({ message: 'Lead with this email already exists' });
        }
      }

      lead.name = name || lead.name;
      lead.email = email || lead.email;
      lead.status = status || lead.status;

      const updatedLead = await lead.save();
      console.log('Updated lead:', updatedLead);
      return res.json(updatedLead);
    } catch (error) {
      console.error('Error in updateLead:', error);
      return res.status(500).json({ 
        message: 'Error updating lead', 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error
      });
    }
  },

  // Delete a lead
  deleteLead: async (req: Request, res: Response): Promise<Response> => {
    try {
      const lead = await Lead.findOneAndDelete({ _id: req.params.id });
      if (!lead) {
        return res.status(404).json({ message: 'Lead not found' });
      }
      return res.json({ message: 'Lead deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting lead', error });
    }
  },
}; 