import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validator.js';
import { authRateLimiter } from '../middlewares/rateLimiter.js';
import { registerSchema, loginSchema, updateProfileSchema, changePasswordSchema } from '../validators/auth.validator.js';

const router = Router();
const controller = new AuthController();

router.post('/register', authRateLimiter, validate(registerSchema), (req, res, next) => controller.register(req, res, next));
router.post('/login', authRateLimiter, validate(loginSchema), (req, res, next) => controller.login(req, res, next));
router.get('/me', authMiddleware, (req, res, next) => controller.me(req, res, next));
router.put('/profile', authMiddleware, validate(updateProfileSchema), (req, res, next) => controller.updateProfile(req, res, next));
router.put('/change-password', authMiddleware, validate(changePasswordSchema), (req, res, next) => controller.changePassword(req, res, next));
router.post('/logout', authMiddleware, (req, res, next) => controller.logout(req, res, next));

export default router;
