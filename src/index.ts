// src/index.ts
import express from 'express';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserRepository } from './repositories/user.repository';
import { ValidationService } from './services/validation.service';
import { errorHandler } from './middleware/error.middleware';

const app = express();
app.use(express.json());

// Dependency Injection
const userRepository = new UserRepository();
const validationService = new ValidationService();
const authService = new AuthService(userRepository, validationService);
const authController = new AuthController(authService);

// Routes
app.post('/auth/register', (req, res) => authController.register(req, res));

// Error handling
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});