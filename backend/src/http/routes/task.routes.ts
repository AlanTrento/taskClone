import { Router } from 'express';
import { TaskController } from '../controllers/TaskController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validator.js';
import {
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
  deleteCompletedSchema,
  markOldSchema,
  getByIdTaskSchema,
} from '../validators/task.validator.js';

const router = Router();
const controller = new TaskController();

router.use(authMiddleware);

router.get('/', (req, res, next) => controller.getAll(req, res, next));
router.get('/:id', validate(getByIdTaskSchema), (req, res, next) => controller.getById(req, res, next));
router.post('/', validate(createTaskSchema), (req, res, next) => controller.create(req, res, next));
router.put('/:id', validate(updateTaskSchema), (req, res, next) => controller.update(req, res, next));
router.delete('/:id', validate(deleteTaskSchema), (req, res, next) => controller.delete(req, res, next));
router.delete('/completed/:listId', validate(deleteCompletedSchema), (req, res, next) => controller.deleteCompleted(req, res, next));
router.put('/mark-old/:listId', validate(markOldSchema), (req, res, next) => controller.markOld(req, res, next));

export default router;
