class User {
  constructor(email, givenName, familyName) {
    User.id += 1;

    this.id = String(User.id);
    this.created = new Date();

    this.email = email;
    this.givenName = givenName;
    this.familyName = familyName;
  }

  static updateUser(user, updatedFields) {
    return { ...user, ...updatedFields };
  }
}

User.id = 0;

class UserService {
  constructor() {
    this.users = [new User('testEmail@email.com', 'First Name', 'Last Name')];

    this.getUserIndex = this.getUserIndex.bind(this);
  }

  getUserIndex(id) {
    return this.users.findIndex(user => user.id === id);
  }

  getById(id) {
    const index = this.getUserIndex(id);

    return this.users[index];
  }

  create(data) {
    const hasUniqueEmail = this.users.every(user => data.email !== user.email);

    if (!hasUniqueEmail) {
      return {
        error: 'Email address already in use'
      };
    }

    if (hasUniqueEmail) {
      const newUser = new User(data.email, data.givenName, data.familyName);

      this.users.push(newUser);

      return newUser;
    }
  }

  remove(id) {
    const index = this.getUserIndex(id);

    if (index < 0) {
      return false;
    }

    this.users.splice(index, 1);

    return true;
  }

  update(id, data) {
    const newEmailIsUnique = this.users.every(
      user => user.id === id || user.email !== data.email
    );

    if (!newEmailIsUnique) {
      return {
        error: 'Email address already in use'
      };
    }

    const index = this.getUserIndex(id);

    if (index < 0) {
      return;
    }

    const userToUpdate = this.users[index];
    const newUser = User.updateUser(userToUpdate, data);

    this.users[index] = newUser;

    return newUser;
  }
}

module.exports = UserService;
