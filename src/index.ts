// src/index.ts
import express, { Response, NextFunction} from 'express';
import { AuthController } from './controllers/auth.controller';
import {AuthService, JobService, PasswordService, TokenService} from './services'
import { UserRepository } from './repositories/user.repository';
import { errorHandler } from './middleware/error.middleware';
import { createAuthMiddleware } from './middleware/auth/auth.middleware';
import { AuthenticatedRequest, UserRole } from './interfaces';
import { validateResource } from './middleware/validation/validation.middleware';
import { loginSchema, registerSchema } from './schemas/register.schema';
import { JobRepository } from './repositories/job.repository';
import { createAuthorizationMiddleware } from './middleware/authorization.middleware';
import { createJobSchema } from './schemas/createJob.schema';
import { JobController } from './controllers/job.controller';
import { updateProfileSchema } from './schemas/profile.schema';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { applyToJobSchema } from './schemas/application.schema';
import { ApplicationRepository } from './repositories/application.repository';
import { ApplicationService } from './services/application.service';
import { ApplicationController } from './controllers/application.controller';

const app = express();
app.use(express.json());

// Dependency Injection
const userRepository = new UserRepository();
const jobRepository = new JobRepository()
const applicationRepository = new ApplicationRepository();
const passwordService = new PasswordService();
const tokenService = new TokenService();
const userService = new UserService(userRepository);
const authService = new AuthService(userRepository, passwordService, tokenService);
const jobService = new JobService(jobRepository)
const applicationService = new ApplicationService(applicationRepository, jobRepository)
const authController = new AuthController(authService);
const jobController = new JobController(jobService, userRepository)
const userController = new UserController(userService);
const applicationController = new ApplicationController(applicationService)

const authMiddleware = createAuthMiddleware(tokenService);
const recruiterAuthorizationMiddleware = createAuthorizationMiddleware([UserRole.recruiter])

const apiRouter = express.Router();

// Routes
apiRouter.post('/auth/register', validateResource(registerSchema), (req, res, next) => authController.register(req, res, next));
apiRouter.post('/auth/login', validateResource(loginSchema), (req, res, next) => authController.login(req, res, next));
apiRouter.post('/auth/logout', (req, res, next) => authController.logout(req, res, next));

apiRouter.get('/profile', authMiddleware, (req: AuthenticatedRequest, res: Response): void => {
    res.json({
        message: 'Welcome to your profile!',
        user: req.user
    });
});

apiRouter.post('/jobs', authMiddleware, recruiterAuthorizationMiddleware, validateResource(createJobSchema), (req, res, next) => jobController.create(req, res, next));
apiRouter.get('/jobs', (req, res, next) => jobController.getAll(req, res, next));
apiRouter.get('/jobs/:id', (req, res, next) => jobController.getById(req, res, next));

apiRouter.patch('/profile', authMiddleware, validateResource(updateProfileSchema), (req, res, next) => userController.updateProfile(req, res, next));

apiRouter.post('/jobs/:jobId/apply', authMiddleware, validateResource(applyToJobSchema), (req, res, next) => applicationController.applyToJob(req, res, next));
apiRouter.get('/jobs/:jobId/applications', authMiddleware, (req, res, next) => applicationController.getApplicationsForJob(req, res, next));

app.use('/api', apiRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
