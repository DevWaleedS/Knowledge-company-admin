import React from "react";
// import pro side bar from pro sidebar
import { ProSidebarProvider } from "react-pro-sidebar";

// import React Router Dom
import ReactDOM from "react-dom/client";

// Import these methods to create app routes
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// use redux toolkit
import { Provider } from "react-redux";
import { store } from "./store/store";

// Import Styles Files
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

// IMPORT ALL PAGES
import RootLayout from "./pages/RootLayout";

// INDEX CSS FILE
import "./index.css";

import {
	Notifications,
	PlatformServices,
	EvaluationThePlatform,
	SEOStoreSetting,
	Employees,
	EmployeeDetails,
	AddNewEmployee,
	EditEmployee,
	JobRoles,
	CreateRole,
	EditRole,
} from "./pages";

// rating and comments of store
import { Rating } from "./pages/Rating";

// Academy Component
import { Academy } from "./pages/Academy";
import { CourseDetails } from "./pages/Academy/Courses";
import { ExplainDetails } from "./pages/Academy/Explains";

// Products Pages ...
import { Products } from "./pages/Products";

import { ErrorPage } from "./pages/ErrorPage";
import { VerifyStore } from "./pages/VerifyStore";

import { DashboardHomePage } from "./pages/DashboardHomePage";
import { PaymentGateways } from "./pages/PaymentGateways";
// ---------------------------------------------------------------------------------------//

// ---------------------------------------------------------------------------------------//

// IMPORT ALL Context Providers
import DeleteProvider from "./Context/DeleteProvider";
import LoadingProvider from "./Context/LoadingProvider";
import ContextProvider from "./Context/ContextProvider";
import TextEditorProvider from "./Context/TextEditorProvider";
import UserAuthorProvider from "./Context/UserAuthorProvider";
import NotificationProvider from "./Context/NotificationProvider";
import ResetPasswordProvider from "./Context/ResetPasswordProvider";

// Souq Otlobha and checkout Pages
import {
	SouqOtlobha,
	ProductRefund,
	CartPage,
	CheckoutPage,
} from "./pages/nestedPages/SouqOtlbha";
import { CheckoutStatus } from "./pages/nestedPages/SouqOtlbha/CheckoutPage/CheckOutStatusPages";

// main Information setting Page
import { MainInformation } from "./pages/MainInformationSetting";

// Login and reset password  pages
import Main from "./pages/Authentication/Main/Main";

import { RestorePassword } from "./pages/Authentication/Login/ResetPasswordPages/RestorePassword";
import { CreateNewPassword } from "./pages/Authentication/Login/ResetPasswordPages/CreateNewPassword";
import SendVerificationCode from "./pages/Authentication/Login/ResetPasswordPages/SendVerificationCode/SendVerificationCode";
import LogInVerificationCode from "./pages/Authentication/Login/ResetPasswordPages/SendVerificationCode/LogInVerificationCode/LogInVerificationCode";
import VerificationPage from "./pages/Authentication/VerificationPage/VerificationPage";

// tasks
import { AddTask, Tasks, EditTask } from "./pages/tasks";

// Technical Support
import { TechnicalSupport } from "./pages/TechnicalSupport";
import TechnicalSupportDetails from "./pages/TechnicalSupport/TechnicalSupportDetails";

// wallet and billing
import { Wallet } from "./pages/Wallet";
import BillingInfo from "./pages/Wallet/BillingInfo";

// reports
import { Reports } from "./pages/Reports";

// packages
import UpgradePackages from "./pages/Packages/UpgradePackages";
import ComparePackages from "./pages/Packages/ComparePackages";
import CheckoutPackages from "./pages/Packages/CheckoutPackages/CheckoutPackages";
import LiveCourseDetails from "./pages/Academy/LiveCourses/LiveCourseDetails";
import CheckoutServicesStatus from "./pages/PlatformServices/CheckoutServices/CheckoutServicesStatus";

/**
 * ----------------------------------------------------------------------------------------------
 *  ALL App Routes
 * -----------------------------------------------------------------------------------------------
 */

const router = createBrowserRouter([
	{ path: "/auth/:type", element: <Main /> },
	{ path: "VerificationPage", element: <VerificationPage /> },
	// RestorePassword Pages
	{
		path: "RestorePassword",
		element: <RestorePassword />,
	},
	{
		path: "SendVerificationCode",
		element: <SendVerificationCode />,
	},

	// if user name is not verify his account
	// LogInVerificationCode
	{
		path: "LogInVerificationCode",
		element: <LogInVerificationCode />,
	},

	{
		path: "CreateNewPassword",
		element: <CreateNewPassword />,
	},

	{
		path: "compare-packages",
		element: <ComparePackages />,
	},
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,

		children: [
			{ index: true, element: <DashboardHomePage /> },
			{ path: "Home", element: <DashboardHomePage /> },
			/**--------------------------------------------------------------------------- */

			/**--------------------------------------------------------------------------- */

			{
				path: "Academy",
				element: <Academy />,
			},
			// Add CourseDetails page nested page for Academy page
			// Add ExplainDetails page nested page for Academy page
			{
				path: "Academy/live-course-details/:id",
				element: <LiveCourseDetails />,
			},
			{
				path: "Academy/CourseDetails/:id",
				element: <CourseDetails />,
			},
			// Add ExplainDetails page nested page for Academy page
			{
				path: "Academy/ExplainDetails/:id",
				element: <ExplainDetails />,
			},

			{
				path: "tasks",
				element: <Tasks />,
			},

			{
				path: "tasks/Add-task",
				element: <AddTask />,
			},

			// Category details page nested page for Category page
			{
				path: "tasks/edit-task/:id",
				element: <EditTask />,
			},

			{
				path: "Products",
				element: <Products />,
			},

			{
				path: "Products/SouqOtlobha",
				element: <SouqOtlobha />,
			},
			// nested ProductRefund Page
			{
				path: "Products/SouqOtlobha/ProductRefund/:id",
				element: <ProductRefund />,
			},

			{
				path: "Products/SouqOtlobha/Cart",
				element: <CartPage />,
			},

			{
				path: "Products/SouqOtlobha/Checkout",
				element: <CheckoutPage />,
			},

			{
				path: "Products/SouqOtlobha/success",
				element: <CheckoutStatus />,
			},

			{
				path: "Products/SouqOtlobha/failed",
				element: <CheckoutStatus />,
			},

			{
				path: "checkout-packages/success",
				element: <CheckoutStatus />,
			},

			{
				path: "checkout-packages/failed",
				element: <CheckoutStatus />,
			},
			{
				path: "PlatformServices/success",
				element: <CheckoutServicesStatus />,
			},

			{
				path: "PlatformServices/failed",
				element: <CheckoutServicesStatus />,
			},

			{
				path: "Rating",
				element: <Rating />,
			},

			// {
			// 	path: "BranchesAndWarehouses",
			// 	element: <BranchesAndWarehouses />,
			// },

			{
				path: "Support",
				element: <TechnicalSupport />,
			},
			//
			{
				path: "Support/supportDetails/:id",
				element: <TechnicalSupportDetails />,
			},
			{
				path: "MainInformation",
				element: <MainInformation />,
			},
			{
				path: "employees",
				element: <Employees />,
			},

			{
				path: "employees/add-new-employee",
				element: <AddNewEmployee />,
			},
			// nested add users page
			{
				path: "employees/edit-employee/:id",
				element: <EditEmployee />,
			},

			{
				path: "employees/employee-details/:id",
				element: <EmployeeDetails />,
			},

			// Roles
			{ path: "employees/roles", element: <JobRoles /> },
			{ path: "employees/create-new-role", element: <CreateRole /> },
			{ path: "employees/edit-role/:id", element: <EditRole /> },

			{
				path: "VerifyStore",
				element: <VerifyStore />,
			},

			// packages
			{
				path: "upgrade-packages",
				element: <UpgradePackages />,
			},

			// Checkout Packages
			{
				path: "checkout-packages",
				element: <CheckoutPackages />,
			},

			{
				path: "PaymentGateways",
				element: <PaymentGateways />,
			},
			{
				path: "wallet",
				element: <Wallet />,
			},

			{
				path: "wallet/billingInfo/:id",
				element: <BillingInfo />,
			},

			{
				path: "Reports",
				element: <Reports />,
			},
			{
				path: "Notifications",
				element: <Notifications />,
			},
			{
				path: "PlatformServices",
				element: <PlatformServices />,
			},

			{
				path: "EvaluationThePlatform",
				element: <EvaluationThePlatform />,
			},
			{
				path: "seo_store_setting",
				element: <SEOStoreSetting />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<ProSidebarProvider>
			<UserAuthorProvider>
				<ContextProvider>
					<ResetPasswordProvider>
						<NotificationProvider>
							<LoadingProvider>
								<DeleteProvider>
									<TextEditorProvider>
										<RouterProvider router={router} />
									</TextEditorProvider>
								</DeleteProvider>
							</LoadingProvider>
						</NotificationProvider>
					</ResetPasswordProvider>
				</ContextProvider>
			</UserAuthorProvider>
		</ProSidebarProvider>
	</Provider>
);
