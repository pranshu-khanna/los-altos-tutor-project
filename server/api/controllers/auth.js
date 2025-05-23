import {db} from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE username=?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const studentSubjects = req.body.studentSubjects?.join(",") || null;
    const tutorSubjects = req.body.tutorSubjects?.join(",") || null;

    const insertQ = "INSERT INTO users (`role`, `username`, `name`, `email`, `password`, `studentSubjects`, `tutorSubjects`) VALUES (?)";
    const values = [req.body.role, req.body.username, req.body.name, req.body.email, hashedPassword, studentSubjects, tutorSubjects];
    db.query(insertQ, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User successfully created.");
    });
});
};

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username=?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found");

        const user = data[0];
        const checkPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!checkPassword) return res.status(400).json("Wrong password or username!");

        const token = jwt.sign({ id: user.id, role: user.role }, "secretKey");

        const parsedUser = {
            ...user,
            studentSubjects: user.studentSubjects ? user.studentSubjects.split(",") : null,
            tutorSubjects: user.tutorSubjects ? user.tutorSubjects.split(",") : null,
        };

        const {password, ...others} = parsedUser;

        res.cookie("accessToken", token, {
            httpOnly: true,
            sameSite: "Lax",
            secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json(others);
    });
};

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .status(200)
    .json("User has successfully logged out.");
  };  