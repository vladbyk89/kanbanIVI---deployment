import express from "express";
const boardRouter = express.Router();

import {
  getAllBoards,
  createBoard,
  getBoard,
  getLists,
  updateBoard,
  getAllUserBoards,
  deleteBoard,
  addListToBoard,
} from "../controller/boardController";

import { boardCookieAuthentication } from "../middleware/cookieJwtAuthintication";

import { removeBoardCookie } from "../middleware/removeCookie";

import { setBoardCookie } from "../middleware/setCookieJWT";

boardRouter.route("/").get(getAllBoards).post(createBoard, setBoardCookie);

boardRouter.route("/removeCookie").delete(removeBoardCookie);

boardRouter.route("/getBoard").get(boardCookieAuthentication, getBoard);

boardRouter.route("/getlists/:boardId").get(getLists);

boardRouter.route("/addList").patch(addListToBoard);

boardRouter.route("/:userId").get(getAllUserBoards);

boardRouter
  .route("/:boardId")
  .post(setBoardCookie)
  .patch(updateBoard)
  .delete(deleteBoard);

export { boardRouter };
