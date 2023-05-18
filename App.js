import Main from "./screens/MainComponent";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./components/LoadingComponent";

export default function App() {
//<persistGate>: is provided by redux persist to help integrate it with react and react native apps prevents the app from loading until the redux store has been rehydrated fully from the client side storage, what we will pass to the loading = is what will show  while redux store ids rehydrating
  return (
   
    <Provider store={store}>
       <PersistGate loading={<Loading />} persistor={persistor}>
    <NavigationContainer>
      <Main />
    </NavigationContainer>
    </PersistGate>
    </Provider>

  );
}


