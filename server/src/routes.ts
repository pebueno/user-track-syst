import { Request, Response, Router } from "express";
import { db } from "./db";
import multer from "multer";
import os from "os";

const router = Router();

const upload = multer({ dest: os.tmpdir() });

router.get("/users", (req: Request, res: Response) => {
  const users = db.prepare("SELECT * FROM users").all();

  res.json({
    users: users,
  });
});

router.get("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

  if (!user) {
    res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

router.put("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { first_name, last_name, email, birthday } = req.body;

  if (!first_name || !last_name || !email || !birthday) {
    res.status(404).json({ error: "All fields are required" });
    return;
  }

  const result = db
    .prepare(
      "UPDATE users SET first_name = ?, last_name = ?, email = ?, birthday = ? WHERE id = ?",
    )
    .run(first_name, last_name, email, birthday, id);

  if (result.changes === 0) {
    res.status(404).json({ error: "User not found" });
  }

  res.json({ message: "User updated successfully" });
});

router.post("/users", (req: Request, res: Response) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.birthday
  ) {
    res.sendStatus(400);
    return;
  }

  const user = db
    .prepare(
      "INSERT INTO users (first_name, last_name, email, birthday) VALUES (@firstName, @lastName, @email, @birthday)",
    )
    .run({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthday: req.body.birthday,
    });

  res.json({
    id: user.lastInsertRowid,
  });
});

router.post(
  "/users/bulk",
  upload.single("file"),
  (req: Request, res: Response) => {
    const file = req.file;

    console.log(file);

    res.sendStatus(200);
  },
);

export default router;
