import React from 'react';
import { Navigate , RouteObject } from 'react-router-dom';

import { Timers, Timer } from 'modules/timer';
import { TopicCreator } from 'modules/topic';
import NotFound from 'pages/NotFound';
import { PAGE_LINK } from 'routes/constants';
// import Maintenance = from /'pages/Maintenance/Maintenance';

const routes: Array<RouteObject> = [
  {
    index: true,
    element: <Navigate to={PAGE_LINK.timer} replace />
  },
  {
    path: '',
    element: <Timer />,
  },
  {
    path: PAGE_LINK.timer,
    element: <Timer />,
  },
  {
    path: PAGE_LINK.timerID,
    element: <Timer />,
  },
  {
    path: PAGE_LINK.timers,
    element: <Timers />,
  },
  {
    path: PAGE_LINK.topicCreator,
    element: <TopicCreator />,
  },
  // {
  //   path: '',
  //   element: <Maintenance />,
  // },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;