
import React from "react";
const Errorhandler = React.lazy(() => import("./pages/errorHandler"));
const Addblog = React.lazy(() => import("./pages/addblog"));
const Description = React.lazy(() => import("./pages/description"));
const Listing = React.lazy(() => import("./pages/listing"));

const routes = [
    {
        path: '/blog/:id',
        component: Description
    },
    {
        path: '/category/:id',
        component: Listing
    },
    {
        path: "/add-blog",
        component: Addblog
    },
    {
        path: '/:id',
        component: Errorhandler
    },
    {
        path: '/',
        component: Listing
    },

]

export default routes;