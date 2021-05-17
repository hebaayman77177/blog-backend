const express = require("express");
const passport = require("passport");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/sign-up").post(authController.signUp);
router.route("/log-in").post(authController.logIn);
router.route("/forgot-password").post(authController.forgotPassword);
router.route("/reset-password/:token").post(authController.resetPassword);

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);
router.get(
  "/google/redirect",
  passport.authenticate("google"),
  authController.googleAuth
);

// auth with facebook
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  authController.facebookAuth
);
router.use(authController.authMiddleware);

router.route("/update-password").patch(authController.updatePassword);
// TODO: see how we can refactor editme and delete me
router.route("/edit-me").patch(userController.editMe);
router.route("/delete-me").delete(userController.deleteMe);
router.route("/get-me").get(userController.putMe, userController.getUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.editUser)
  .delete(userController.deleteUser);

module.exports = router;
