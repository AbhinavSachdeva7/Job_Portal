import { NextFunction, Response } from 'express';
import { AuthenticatedRequest, IApplicationService } from '../interfaces';

export class ApplicationController {
  constructor(private applicationService: IApplicationService) {}

  async applyToJob(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const jobId = parseInt(req.params.jobId, 10);
      const user = req.user!;
      const data = req.body;
      const application = await this.applicationService.applyToJob(jobId, user, data);
      res.status(201).json(application);
    } catch (error) {
      next(error);
    }
  }

  async getApplicationsForJob(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const jobId = parseInt(req.params.jobId, 10);
      const user = req.user!;
      const applications = await this.applicationService.getApplicationsForJob(jobId, user);
      res.status(200).json(applications);
    } catch (error) {
      next(error);
    }
  }
}
