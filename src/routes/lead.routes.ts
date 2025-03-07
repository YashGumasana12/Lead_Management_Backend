import { Router } from 'express';
import { leadController } from '../controllers/lead.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { createLeadValidation, updateLeadValidation } from '../validations/lead.validation';

const router = Router();

// Routes
router.get('/', leadController.getAllLeads);
router.get('/:id', leadController.getLeadById);
router.post('/', createLeadValidation, validateRequest, leadController.createLead);
router.put('/:id', updateLeadValidation, validateRequest, leadController.updateLead);
router.delete('/:id', leadController.deleteLead);

export const leadRoutes = router; 