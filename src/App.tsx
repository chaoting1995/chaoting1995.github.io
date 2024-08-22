import React from "react";
import { useRoutes } from "react-router-dom";

import routes from "routes";
import PageLoading from "pages/PageLoading/PageLoading";
import OfflineHandle from "components/OfflineHandle";

function App() {
  const element = useRoutes(routes);

  return (<>
    <React.Suspense fallback={<PageLoading />}>
      {element}
    </React.Suspense>
    <OfflineHandle />
  </>
  );
}

export default App;