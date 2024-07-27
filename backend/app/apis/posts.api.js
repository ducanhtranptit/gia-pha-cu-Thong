const express = require("express");
const router = express.Router();
const VerifyTokemMiddleware = require("../middlewares/auth/verify-token.middleware");
const PostsController = require("../controllers/posts.controller");

router.get("/posts-list", PostsController.GetAllPosts);
router.get("/get-detail/:id", PostsController.GetDetailPost);
router.post(
  "/create-posts",
  VerifyTokemMiddleware,
  PostsController.CreatePosts
);
router.get("/get-posts-latest", PostsController.GetPostsLatest);
router.put(
  "/update-posts/:id",
  VerifyTokemMiddleware,
  PostsController.UpdateDataPost
);
router.delete(
  "/delete-posts/:id",
  VerifyTokemMiddleware,
  PostsController.DeletePosts
);

module.exports = router;
