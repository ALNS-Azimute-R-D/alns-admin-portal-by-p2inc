import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/error-page";
import Organizations from "pages/organizations";
import OrganizationDetail from "pages/organizations/detail";
import OrganizationSettings from "pages/organizations/settings";
import Profile from "pages/profile";
import { keycloak } from "keycloak";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Loading from "components/elements/loading";
import RoleProfile from "pages/profile/role";
import SigninProfile from "pages/profile/signin";
import GeneralProfile from "pages/profile/general";
import ActivityProfile from "pages/profile/activity";
import LinkedProfile from "pages/profile/linked";
import { store } from "./store/";
import { Provider } from "react-redux";
import Invitation from "pages/invitation/index";
import SendingInvitation from "pages/invitation/sending";
import NewInvitation from "pages/invitation/new";
import DomainsAdd from "pages/organizations/domains/add";
import DomainsVerify from "pages/organizations/domains/verify";
import DomainContainer from "pages/organizations/domains";
import SettingsGeneral from "pages/organizations/settings/general";
import SettingsDomain from "pages/organizations/settings/domains";
import SettingsSSO from "pages/organizations/settings/sso";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/organizations",
        element: <Organizations />,
      },
      {
        path: "/organizations/:orgId/details",
        element: <OrganizationDetail />,
      },
      {
        path: "/organizations/:orgId/settings",
        index: true,
        loader: () => redirect("general"),
      },
      {
        path: "/organizations/:orgId/settings/*",
        element: <OrganizationSettings />,
        children: [
          {
            path: "general",
            element: <SettingsGeneral />,
          },
          {
            path: "domains",
            element: <SettingsDomain />,
          },
          {
            path: "sso",
            element: <SettingsSSO />,
          },
        ],
      },
      {
        path: "/organizations/:orgId/domains",
        index: true,
        loader: () => redirect("add"),
      },
      {
        path: "/organizations/:orgId/domains/*",
        element: <DomainContainer />,
        children: [
          {
            path: "add",
            element: <DomainsAdd />,
          },
          {
            path: "verify",
            element: <DomainsVerify />,
          },
        ],
      },
      {
        path: "/organizations/:orgId/invitation",
        element: <Invitation />,
        children: [
          {
            path: "new",
            element: <NewInvitation />,
          },
        ],
      },
      {
        path: "/profile",
        index: true,
        loader: () => redirect("general"),
      },
      {
        path: "/profile/*",
        element: <Profile />,
        children: [
          {
            path: "general",
            element: <GeneralProfile />,
          },
          {
            path: "role",
            element: <RoleProfile />,
          },
          {
            path: "signin",
            element: <SigninProfile />,
          },
          {
            path: "activity",
            element: <ActivityProfile />,
          },
          {
            path: "linked",
            element: <LinkedProfile />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="organizations" />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={{ onLoad: "login-required", checkLoginIframe: false }}
    LoadingComponent={<Loading />}
  >
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
    <Toaster
      toastOptions={{
        duration: 6000,
      }}
    />
  </ReactKeycloakProvider>
);
