const UserService = require('./user.service');
const UserCreateModel = require('./user-create.model');
const UserUpdateModel = require('./user-update.model');

class UserController {
  constructor() {
    this.userService = new UserService();
    this.userCreateModel = new UserCreateModel();
    this.userUpdateModel = new UserUpdateModel();

    this.getById = this.getById.bind(this);
    this.delete = this.delete.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
  }

  registerRoutes(router) {
    router.get('/user/:id', this.getById);
    router.delete('/user/:id', this.delete);
    router.put(
      '/user/:id',
      this.userUpdateModel.useAsExpressMiddleware,
      this.put
    );
    router.post(
      '/user',
      this.userCreateModel.useAsExpressMiddleware,
      this.post
    );
  }

  getById(req, res) {
    const id = req.params.id;

    const result = this.userService.getById(id);

    if (result === undefined) {
      res.status(404).json({
        title: 'Invalid ID',
        message: 'No user with that ID found'
      });
    } else {
      res.status(200).json(result);
    }
  }

  post(req, res) {
    const result = this.userService.create(req.body);

    if (result.error) {
      res.status(500).json({
        title: 'Invalid request',
        message: result.error
      });
    }

    res.status(201).json(result);
  }

  put(req, res) {
    const id = req.params.id;
    const result = this.userService.update(id, req.body);

    if (result === undefined) {
      res.status(400).json({
        title: 'Invalid request',
        message: 'Invalid id'
      });
    }

    res.status(200).json(result);
  }

  delete(req, res) {
    const id = req.params.id;

    const didDelete = this.userService.remove(id);

    if (didDelete) {
      res.status(200).json({
        title: 'Success',
        message: 'User deleted'
      });
    } else {
      res.status(409).json({
        title: 'Invalid request',
        message: `Unable to delete user with id: ${id}`
      });
    }
  }
}

module.exports = new UserController();
