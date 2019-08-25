
import React from "react";
import FourZeroFour from "./pages/fourzerofour";
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
        path: '/:id',
        component : FourZeroFour
    },
    {
        path: '/',
        component: Listing
    },
    
]

export default routes;