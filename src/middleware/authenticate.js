import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import User from '../models/user.js';

export const authenticate = async (req, res, next) => {
    const { accessToken } = req.cookies;

    // 1. Перевірка наявності accessToken
    if (!accessToken) {
      throw createHttpError(401, 'Missing access token');
    }

    // 2. Пошук сесії
    const session = await Session.findOne({ accessToken });

    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    // 3. Перевірка терміну дії accessToken
    const isExpired = new Date() > new Date(session.accessTokenValidUntil);

    if (isExpired) {
      throw createHttpError(401, 'Access token expired');
    }

    // 4. Пошук користувача
    const user = await User.findById(session.userId);

    if (!user) {
      throw createHttpError(401);
    }

    // 5. Додаємо користувача у request
    req.user = user;

    next();
};
