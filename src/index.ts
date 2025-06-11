// src/index.ts
import express from 'express';
import { AuthController } from './controllers/auth.controller';
import {AuthService, PasswordService, TokenService, ValidationService} from './services'
import { UserRepository } from './repositories/user.repository';
import { errorHandler } from './middleware/error.middleware';
import { createAuthMiddleware } from './middleware/auth/auth.middleware';

const app = express();
app.use(express.json());

// Dependency Injection
const userRepository = new UserRepository();
const passwordService = new PasswordService();
const tokenService = new TokenService();
const validationService = new ValidationService();

const authService = new AuthService(userRepository, passwordService, tokenService);

const authController = new AuthController(authService);

const authMiddleware = createAuthMiddleware(tokenService);

const apiRouter = express.Router();
// Routes
apiRouter.post('/auth/register', (req, res, next) => authController.register(req, res, next));
apiRouter.post('/auth/login', (req, res, next) => authController.login(req, res, next));

apiRouter.get('/profile', authMiddleware, (req, res) => {
    // Because the `authMiddleware` ran successfully, we know `req.user` exists.
    // The middleware has already validated the user and attached their info to the request.
    res.json({
        message: 'Welcome to your profile!',
        user: req.user
    });
});

app.use('/api', apiRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
