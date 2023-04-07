import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

class authController {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const isUsed = await User.findOne({ username });
      if (isUsed) {
        return res
          .status(200)
          .json({ message: 'Пользователь с таким именем уже существует!' });
      }
      if (username === '' && password === '') {
        return res.status(200).json({ message: 'Введите данные!' });
      }
      if (password === '') {
        return res.status(200).json({ message: 'Вы не ввели пароль!' });
      }
      if (password.length < 8) {
        return res
          .status(200)
          .json({ message: 'Минимальное число символов пароля 8!' });
      }

      const salt = bcrypt.genSaltSync(10);
      var hashPassword = bcrypt.hashSync(password, salt);

      const newUser = new User({ username, password: hashPassword });
      const token = jwt.sign(
        {
          id: newUser._id,
        },
        JWT_SECRET,
        { expiresIn: '30d' }
      );
      await newUser.save();
      return res.status(201).json({
        newUser,
        token,
        message: 'Пользователь успешно зарегистрирован',
      });
    } catch (e) {
      res.status(400).json({ message: 'Ошибка регистрации' });
    }
  }

  //Login user
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (username === '' && password === '') {
        return res.status(200).json({ message: 'Введите данные!' });
      }
      if (password === '') {
        return res.status(200).json({ message: 'Вы не ввели пароль!' });
      }
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(200)
          .json({ message: 'Пользователя с таким именем не существует' });
      }

      const isPasswordCorrect = await bcrypt.compareSync(
        password,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.json({ message: 'Неверный пароль' });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_SECRET,
        { expiresIn: '30d' }
      );
      return res.json({
        token,
        user,
        message: 'Вы вошли в систему',
      });
    } catch (e) {
      res.status(401).json({ message: 'Ошибка регистрации' });
    }
  }

  //Get me
  async getMe(req, res) {
    try {
      const user = await User.findById(req.userId);
      console.log(user);
      if (!user) {
        return res
          .status(200)
          .json({ message: 'Пользователя с таким именем не существует' });
      }
      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_SECRET,
        { expiresIn: '30d' }
      );
      return res.status(200).json({ user, token }); //если что убрать
    } catch (e) {
      res.status(400).json({ message: 'Нет доступа!' });
    }
  }
}

export default new authController();
