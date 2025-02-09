import React from "react";
import { Sidebar, Menu } from "react-pro-sidebar";

// Redux
import { useDispatch } from "react-redux";
import { openVerifyModal } from "../../store/slices/VerifyStoreModal-slice";

import { openDelegateRequestAlert } from "../../store/slices/DelegateRequestAlert-slice";

// Side bar components
import SidebarLink from "./SidebarLink";
import SidebarSubMenu from "./SidebarSubMenu";

// Icons
import {
	Academy,
	Delevray,
	Evaluation,
	Info,
	Orders,
	PagesIcon,
	Payment,
	Products,
	Rating,
	Reports,
	Services,
	Setting,
	Support,
	Template,
	Verification,
} from "../../data/Icons";

import { FaCrown, FaUsersGear } from "react-icons/fa6";
import { BsCartX } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { BiCartAdd, BiSolidRocket } from "react-icons/bi";
import { FaCircle, FaTasks, FaUserCheck, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetUpgradePackagesQuery } from "../../store/apiSlices/upgradePackagesApi";

const SideBar = ({
	open,
	closeSidebar,
	verificationStatus,
	packagePaidStatus,
	packageId,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { data: upgradePackages, isLoading: loadingPackages } =
		useGetUpgradePackagesQuery();

	const selectedPackage = upgradePackages?.find(
		(pack) => pack?.is_selected && pack?.package_paid
	);

	const handleOpenVerificationModal = () => {
		if (
			(packagePaidStatus && packageId && verificationStatus !== "تم التوثيق") ||
			(!packagePaidStatus && !packageId && verificationStatus === "تم التوثيق")
		) {
			dispatch(openVerifyModal());
		}
	};

	// handle open Verification Status
	const handleOpenVerificationStatus = () => {
		dispatch(openVerifyModal());
	};

	// sub menu items
	const submenuItems = {
		orders: [
			{ to: "Orders", icon: BiCartAdd, label: "الطلبات" },
			{ to: "ReturnOrders", icon: BsCartX, label: "المرتجعات" },
		],

		storeInfo: [
			{
				to: "Home",
				icon: Verification,
				label: "توثيق الشركة",
				isVerifyStoreModal: handleOpenVerificationStatus,
			},
		],

		setting: [
			{
				to: "MainInformation",
				icon: FaCircle,
				label: "إعدادت النظام الأساسية",
			},

			{ to: "Notifications", icon: FaCircle, label: "الإشعارات" },
		],
	};

	return (
		<Sidebar
			rtl={true}
			className={`sidebar ${open ? "show" : ""}`}
			style={{ height: "100%" }}>
			<div className=' store_is_verified py-3 d-flex justify-content-start align-content-center gap-1 pe-2'>
				{verificationStatus === "تم التوثيق" && (
					<div className='verify_box d-flex justify-content-center align-content-center gap-1 '>
						<MdVerified className='verify_icon' />
						<p className='mb-0 pb-0'>شركة موثقة</p>
					</div>
				)}

				{!loadingPackages && selectedPackage && (
					<div
						onClick={() => navigate("/upgrade-packages")}
						className='verify_box d-flex justify-content-center align-content-center gap-1 mouse-pointer'>
						<FaCrown className='verify_icon' />
						<p
							className='mb-0 pb-0 '
							style={{
								maxWidth: "103px",
								overflow: "hidden",
								whiteSpace: "nowrap",
								textOverflow: "ellipsis",
							}}>
							{selectedPackage?.name}
						</p>
					</div>
				)}
			</div>
			<Menu>
				<SidebarLink
					to=''
					icon={FaHome}
					label='الرئيسية'
					className='menu-link'
					onClick={closeSidebar}
				/>
				<SidebarLink
					to='tasks'
					icon={FaTasks}
					label='إدارة المهام'
					className='menu-link'
					onClick={() => {
						closeSidebar();
						handleOpenVerificationModal();
					}}
				/>

				<SidebarLink
					to='employees'
					icon={FaUsersGear}
					label=' إدارة الموظفين'
					className='menu-link'
					onClick={() => {
						closeSidebar();
						handleOpenVerificationModal();
					}}
				/>
				<SidebarLink
					to='Products'
					icon={Products}
					label=' المنتجات والخدمات'
					className='menu-link'
					onClick={() => {
						closeSidebar();
						handleOpenVerificationModal();
					}}
				/>
				<SidebarSubMenu
					label='الطلبات'
					icon={Orders}
					items={submenuItems.orders}
					onClose={closeSidebar}
					onVerify={handleOpenVerificationModal}
				/>
				<SidebarLink
					to='PlatformServices'
					icon={Services}
					label='خدمات المنصة'
					className='menu-link'
					onClick={() => {
						closeSidebar();
						handleOpenVerificationModal();
					}}
				/>

				<SidebarLink
					to='Rating'
					icon={Rating}
					label='التقييمات'
					className='menu-link'
					onClick={() => {
						closeSidebar();
						handleOpenVerificationModal();
					}}
				/>
				<SidebarLink
					to='RequestDelegate'
					icon={FaUserCheck}
					label='طلب مندوب'
					className='menu-link'
					onClick={() => {
						closeSidebar();
						if (verificationStatus !== "تم التوثيق") {
							handleOpenVerificationModal();
						} else {
							dispatch(openDelegateRequestAlert());
						}
					}}
				/>
				<SidebarLink
					to='Pages'
					icon={PagesIcon}
					label='الصفحات'
					className='menu-link'
					onClick={() => {
						closeSidebar();
						handleOpenVerificationModal();
					}}
				/>
				<SidebarLink
					to='Academy'
					icon={Academy}
					label='الأكاديمية'
					className='menu-link'
					onClick={() => {
						closeSidebar();
						handleOpenVerificationModal();
					}}
				/>
				{/* Template sub menu */}
				<SidebarSubMenu
					label='القالب'
					icon={Template}
					items={submenuItems.template}
					onClose={closeSidebar}
					onVerify={handleOpenVerificationModal}
				/>
				{/* Store Info Sub menu */}
				<SidebarSubMenu
					label='بيانات المتجر'
					icon={Info}
					items={submenuItems.storeInfo}
					onClose={closeSidebar}
					onVerify={handleOpenVerificationModal}
				/>
				<SidebarLink
					to='Support'
					icon={Support}
					label='الدعم الفني'
					className='menu-link'
					onClick={() => {
						closeSidebar();
						handleOpenVerificationModal();
					}}
				/>
				<SidebarLink
					to='ShippingCompanies'
					icon={Delevray}
					label='شركات الشحن'
					className='menu-link'
					onClick={() => {
						closeSidebar();
						handleOpenVerificationModal();
					}}
				/>
				<SidebarLink
					to='PaymentGateways'
					icon={Payment}
					label='بوابات الدفع'
					className='menu-link'
					onClick={() => {
						closeSidebar();
						handleOpenVerificationModal();
					}}
				/>
				<SidebarLink
					to='wallet'
					icon={IoWallet}
					label='المحفظة والفواتير'
					className='menu-link'
					onClick={() => {
						closeSidebar();
						handleOpenVerificationModal();
					}}
				/>
				{/** Setting Sub menu */}
				<SidebarSubMenu
					label='الاعدادات'
					icon={Setting}
					items={submenuItems.setting}
					onClose={closeSidebar}
					onVerify={handleOpenVerificationModal}
				/>

				<SidebarLink
					to='upgrade-packages'
					icon={BiSolidRocket}
					label=' ترقية الباقة'
					className='menu-link'
					onClick={() => {
						closeSidebar();
					}}
				/>
				<SidebarLink
					to='Reports'
					icon={Reports}
					label='التقارير'
					className='menu-link'
					onClick={() => {
						closeSidebar();
						handleOpenVerificationModal();
					}}
				/>
				<SidebarLink
					to='EvaluationThePlatform'
					icon={Evaluation}
					label='تقييم المنصة'
					className='menu-link'
					onClick={() => {
						closeSidebar();
						handleOpenVerificationModal();
					}}
				/>
			</Menu>
		</Sidebar>
	);
};

export default SideBar;
