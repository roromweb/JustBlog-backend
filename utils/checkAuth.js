import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

export const checkAuth = (req, res, next) => {
  const token = (req.headers.autorisation ?? '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      req.userId = decoded.id;

      next(); //
    } catch (e) {
      return res.json({ message: 'Вы вошли в систему' });
    }
  } else {
    return res.json({ message: 'Нет доступа' });
  }
};
