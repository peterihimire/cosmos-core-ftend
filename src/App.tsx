import React, { type JSX } from "react";
import AllRoutes from "./routes/Routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import $axios from "./redux/api/config";
import { setupAxiosInterceptors } from "./utils/SetupAxiosInterceptor";

setupAxiosInterceptors($axios,
  // store.dispatch
);
const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <AllRoutes />
    </Provider>
  );
};
export default App;
