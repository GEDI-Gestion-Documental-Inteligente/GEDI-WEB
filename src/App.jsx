import './App.css'
import * as React from "react";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginScreen />,
    },
  ]);

  return (
    <>
        <RouterProvider router={router} />
      {/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer> */}
    </>
  )
}

export default App
