"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotification = exports.deleteNotification = exports.passwordRecovery = exports.login = exports.getNotification = exports.createNotification = exports.getAllNotifications = void 0;
const notificationModel_1 = __importDefault(require("../model/notificationModel"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const secret = process.env.JWT_SECRET;
const getAllNotifications = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield notificationModel_1.default.find({});
        res.status(200).json({ notifications });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllNotifications = getAllNotifications;
const createNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        // const findNotification = await Notification.findOne({ message });
        // if (findNotification) return res.send(`Email exists in the system`);
        const notification = yield notificationModel_1.default.create({ message });
        res
            .status(200)
            .send({ success: true, message: `Created => ${notification}` });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.createNotification = createNotification;
const getNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notificationId = req.body;
        const notification = yield notificationModel_1.default.findById(notificationId);
        res.json({ notification });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.getNotification = getNotification;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notificationName, password } = req.body;
        //Notification Authentication....
        const findNotification = yield notificationModel_1.default.findOne({
            notificationName,
            password,
        });
        if (!findNotification)
            throw new Error("Notification not found on get notification function");
        if (!secret)
            throw new Error("Missing jwt secret");
        const token = jwt_simple_1.default.encode({ notificationId: findNotification._id, role: "public" }, secret);
        res.cookie("notification", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
        });
        res.redirect("/main");
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.login = login;
const passwordRecovery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, notificationName, email } = req.body;
        const notification = yield notificationModel_1.default.findOne({
            firstName,
            lastName,
            notificationName,
            email,
        });
        if (!notification)
            throw new Error("Notification not found, check entered data");
        res.status(200).send({ notification });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.passwordRecovery = passwordRecovery;
const deleteNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: notificationId } = req.params;
        const notification = yield notificationModel_1.default.deleteOne({ _id: notificationId });
        const notifications = yield notificationModel_1.default.find({});
        res.status(200).send({ notifications });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.deleteNotification = deleteNotification;
const updateNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: notificationId } = req.params;
        const data = req.body;
        const notifications = yield notificationModel_1.default.find({});
        const notification = yield notificationModel_1.default.findById({ _id: notificationId });
        res.status(201).json({ notifications });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.updateNotification = updateNotification;
