"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const cow_route_1 = require("../modules/cow/cow.route");
const order_route_1 = require("../modules/order/order.route");
const user_route_1 = require("../modules/user/user.route");
const modulesRoutes = [
    {
        path: '/admins',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/cows',
        route: cow_route_1.CowRoutes,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRoutes,
    },
];
exports.default = modulesRoutes;
