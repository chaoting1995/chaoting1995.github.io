import React from "react";
import { Navigate , RouteObject } from "react-router-dom";

import Timer from "pages/Timer/Timer";
import NotFound from "pages/NotFound/NotFound";
import { PAGE_LINKS } from "routes/constants";
// import Maintenance = from /"pages/Maintenance/Maintenance";

const routes: Array<RouteObject> = [
  {
    index: true,
    element: <Navigate to={PAGE_LINKS.timer} replace />
  },
  {
    path: "",
    element: <Timer />,
  },
  {
    path: PAGE_LINKS.timer,
    element: <Timer />,
  },
  // {
  //   path: "",
  //   element: <Maintenance />,
  // },
  {
    path: "*",
    element: <NotFound />
  }
];

export default routes;