import express from "express";
import db from "../db";

import { User } from "../models/user";

const router = express.Router();

/** Get users: [user, user, user] */
router.get(
  "/",
  async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const users = await User.getAll();
    return res.json(users);
  }
);

/** Get user, return user */
router.get(
  "/:id",
  async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { id } = req.params;
    const user = await User.getById(+id);
    return res.json(user);
  }
);

/** Update user, returning user */

router.patch(
  "/:username",
  async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { username } = req.params;

    const user = await User.update(username, req.body);

    return res.json({ user });
  }
);

/** Delete user, returning {message: "Deleted"} */

router.delete(
  "/:id",
  async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { id } = req.params;

    await User.remove(+id);
    return res.json({ message: `User ${req.params.id} deleted.` });
  }
);

export { router };
