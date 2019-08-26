
import React from "react";
const FourZeroFour = React.lazy(() => import("./pages/fourzerofour"));
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
        component: FourZeroFour
    },
    {
        path: '/',
        component: Listing
    },

]

export default routes;