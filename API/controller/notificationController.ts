import { NextFunction, Response, Request } from "express";
import Notification from "../model/notificationModel";
import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET;

export const getAllNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notifications = await Notification.find({});
    res.status(200).json({ notifications });
  } catch (error) {
    console.error(error);
  }
};

export const createNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;

    // const findNotification = await Notification.findOne({ message });

    // if (findNotification) return res.send(`Email exists in the system`);

    const notification = await Notification.create({ message });

    res
      .status(200)
      .send({ success: true, message: `Created => ${notification}` });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notificationId = req.body;
    const notification = await Notification.findById(notificationId);
    res.json({ notification });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { notificationName, password } = req.body;

    //Notification Authentication....

    const findNotification = await Notification.findOne({
      notificationName,
      password,
    });

    if (!findNotification)
      throw new Error("Notification not found on get notification function");

    if (!secret) throw new Error("Missing jwt secret");

    const token = jwt.encode(
      { notificationId: findNotification._id, role: "public" },
      secret
    );

    res.cookie("notification", token, {
      maxAge: 60 * 60 * 1000, //1 hours
      httpOnly: true,
    });
    res.redirect("/main");
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const passwordRecovery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, notificationName, email } = req.body;
    const notification = await Notification.findOne({
      firstName,
      lastName,
      notificationName,
      email,
    });

    if (!notification)
      throw new Error("Notification not found, check entered data");

    res.status(200).send({ notification });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const deleteNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: notificationId } = req.params;
    const notification = await Notification.deleteOne({ _id: notificationId });
    const notifications = await Notification.find({});

    res.status(200).send({ notifications });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: notificationId } = req.params;
    const data = req.body;
    const notifications = await Notification.find({});
    const notification = await Notification.findById({ _id: notificationId });

    res.status(201).json({ notifications });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
