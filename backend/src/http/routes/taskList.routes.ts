import { Router } from 'express';
import { TaskListController } from '../controllers/TaskListController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validator.js';
import { createTaskListSchema, updateTaskListSchema, deleteTaskListSchema, getByIdTaskListSchema } from '../validators/taskList.validator.js';

const router = Router();
const controller = new TaskListController();

router.use(authMiddleware);

router.get('/', (req, res, next) => controller.getAll(req, res, next));
router.get('/:id', validate(getByIdTaskListSchema), (req, res, next) => controller.getById(req, res, next));
router.post('/', validate(createTaskListSchema), (req, res, next) => controller.create(req, res, next));
router.put('/:id', validate(updateTaskListSchema), (req, res, next) => controller.update(req, res, next));
router.delete('/:id', validate(deleteTaskListSchema), (req, res, next) => controller.delete(req, res, next));

export default router;
