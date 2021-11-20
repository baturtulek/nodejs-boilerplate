const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const systemRoutes = require("./system.route");

const ROUTES = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/system",
    route: systemRoutes,
  },
];

ROUTES.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = { v1Routes: router, ROUTES };
