import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "routes";
import PageLoading from "pages/PageLoading/PageLoading";
import OfflineHandle from "components/OfflineHandle";
import TimersProvider from 'provider/Timers/TimersProvider';

function App() {
  const element = useRoutes(routes);

  return (<>
      <React.Suspense fallback={<PageLoading />}>
        <TimersProvider>
          {element}
        </TimersProvider>
      </React.Suspense>
      <OfflineHandle />
  </>
  );
}

export default App;