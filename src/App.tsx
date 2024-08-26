import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from 'routes';
import PageLoading from 'pages/PageLoading';
import TimersProvider from 'context/Timers/Timers.provider';
// import OfflineHandle from 'components/OfflineHandle';
import ServiceGA4 from 'modules/ga4/services/ga4.service';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  ServiceGA4.init();
  window.onpageshow = function (event) {
    if (event.persisted) window.location.reload();
  };

  const element = useRoutes(routes);

  return (<>
      <React.Suspense fallback={<PageLoading />}>
        <HelmetProvider>
          <TimersProvider>
            {element}
          </TimersProvider>
        </HelmetProvider>
      </React.Suspense>
      {/* <OfflineHandle /> */}
  </>
  );
}

export default App;