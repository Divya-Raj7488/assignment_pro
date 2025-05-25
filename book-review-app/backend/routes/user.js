const express = require("express");
const router = express.Router();
const { getUserById, updateUser } = require("../controller/user");

router.route("/:id").get(getUserById);
router.route(":id").put(updateUser);

module.exports = router;
