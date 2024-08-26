import ReactGA from "react-ga4";
import env from "env/env";
// import gaEventConfig from "utils/gaEventConfig.constants";

export const init = () => {
  return ReactGA.initialize(env.evaluationID);
};

// custom pageview with the location from react router
export const pageView = (path: string) => {
  return ReactGA.send({ hitType: "pageview", page: path });
};

// custom event with label being an optional parameter
export const event = (param: string) => ReactGA.event(param);

// export const GA_EVENT = JSON.parse(JSON.stringify(gaEventConfig));
// demo: ServiceGA4.event(GA_EVENT.Clint_UserNftList_Click);

const ServiceGA4 = {
  init,
  pageView,
  event,
  // GA_EVENT
};

export default ServiceGA4;