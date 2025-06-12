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

const app = express();
app.use(express.json());

// Dependency Injection
const userRepository = new UserRepository();
const jobRepository = new JobRepository()
const passwordService = new PasswordService();
const tokenService = new TokenService();
const authService = new AuthService(userRepository, passwordService, tokenService);
const jobService = new JobService(jobRepository)
const authController = new AuthController(authService);
const jobController = new JobController(jobService,userRepository)

const authMiddleware = createAuthMiddleware(tokenService);
const recruiterAuthorizationMiddleware = createAuthorizationMiddleware([UserRole.recruiter])

const apiRouter = express.Router();

// Routes
apiRouter.post('/auth/register', validateResource(registerSchema), (req, res, next) => authController.register(req, res, next));
apiRouter.post('/auth/login', validateResource(loginSchema), (req, res, next) => authController.login(req, res, next));
apiRouter.post('/auth/logout', (req, res, next) => authController.logout(req, res, next));

apiRouter.get('/profile', authMiddleware, (req: AuthenticatedRequest, res: Response): void => {
    // Because the `authMiddleware` ran successfully, we know `req.user` exists.
    // The middleware has already validated the user and attached their info to the request.
    res.json({
        message: 'Welcome to your profile!',
        user: req.user
    });
});

apiRouter.post('/jobs', authMiddleware, recruiterAuthorizationMiddleware, validateResource(createJobSchema), (req, res, next) => jobController.create(req, res, next))
apiRouter.get('/jobs', (req, res, next) => jobController.getAll(req, res, next))
apiRouter.get('/jobs/:id', (req, res, next) => jobController.getById(req, res, next))

app.use('/api', apiRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
