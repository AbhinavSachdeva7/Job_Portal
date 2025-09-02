// src/index.ts
import express, { Response} from 'express';
import { AuthController } from './controllers/auth.controller';
import {AuthService, JobService, PasswordService, TokenService} from './services'
import { UserRepository } from './repositories/user.repository';
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
import cors from 'cors';
import { errorHandler } from './middleware/error.middleware';
import 'dotenv/config';
import { rateLimit } from 'express-rate-limit';

const app = express();

// Rate Limiter: Apply to all requests to /api/
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

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
apiRouter.use(limiter);

// Routes
/* eslint-disable @typescript-eslint/unbound-method */
apiRouter.post('/auth/register', validateResource(registerSchema), authController.register);
apiRouter.post('/auth/login', validateResource(loginSchema), authController.login);
apiRouter.post('/auth/logout', authController.logout);

apiRouter.get('/profile', authMiddleware, (req: AuthenticatedRequest, res: Response): void => {
    res.json({
        message: 'Welcome to your profile!',
        user: req.user
    });
});

apiRouter.post('/jobs', authMiddleware, recruiterAuthorizationMiddleware, validateResource(createJobSchema), jobController.create);
apiRouter.get('/jobs', jobController.getAll);
apiRouter.get('/jobs/:id', jobController.getById);

apiRouter.patch('/profile', authMiddleware, validateResource(updateProfileSchema), userController.updateProfile);

apiRouter.post('/jobs/:jobId/apply', authMiddleware, validateResource(applyToJobSchema), applicationController.applyToJob);
apiRouter.get('/jobs/:jobId/applications', authMiddleware, applicationController.getApplicationsForJob);

/* eslint-enable @typescript-eslint/unbound-method */

app.get('/', (req, res) => {
  res.status(200).send('API is running.');
});

app.use('/api', apiRouter)

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
