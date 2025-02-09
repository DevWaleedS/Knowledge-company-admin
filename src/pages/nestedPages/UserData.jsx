import React, { useState, useEffect } from "react";

// Third party
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

// Components
import useFetch from "../../Hooks/UseFetch";
// Helpers
import { CircularLoading } from "../../HelperComponents";

// MUI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// Icons
import { Message, Mobile, User } from "../../data/Icons";

const style = {
	position: "fixed",
	top: "80px",
	left: "0%",
	transform: "translate(0%, 0%)",
	width: "81%",
	height: "100%",
	overflow: "auto",
	bgcolor: "#fff",
	paddingBottom: "80px",
	"@media(max-width:768px)": {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		backgroundColor: "#F6F6F6",
		paddingBottom: 0,
	},
};
const UserData = () => {
	const { id } = useParams();

	const { fetchedData, loading } = useFetch(`user/${id}`);

	const navigate = useNavigate();
	const [user, setUser] = useState({
		name: "",
		user_name: "",
		role: "",
		email: "",
		password: "",
		phonenumber: "",
		image: "",
		status: "",
	});
	useEffect(() => {
		setUser({
			...user,
			name: fetchedData?.data?.users?.name,
			user_name: fetchedData?.data?.users?.user_name,
			role: fetchedData?.data?.users?.role?.name,
			email: fetchedData?.data?.users?.email,
			image: fetchedData?.data?.users?.image,
			phonenumber: fetchedData?.data?.users?.phonenumber,
			status: fetchedData?.data?.users?.status,
		});
	}, [fetchedData?.data?.users]);

	return (
		<>
			<Helmet>
				<title>لوحة تحكم المعرفة | تفاصيل المستخدم</title>
			</Helmet>
			<div className='add-category-form' open={true}>
				<Modal
					open={true}
					onClose={() => navigate("/employees")}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'>
					<Box component={"div"} sx={style}>
						<div className='add-form-wrapper add-user-form'>
							<div className='d-flex'>
								<div className='col-12'>
									<div className='form-title  '>
										<h5 className='mb-3'> عرض بيانات المستخدم </h5>
										<p>تفاصيل المستخدم</p>
									</div>
								</div>
							</div>
							<form>
								{loading ? (
									<div className='pt-md-5'>
										<CircularLoading />
									</div>
								) : (
									<>
										<div className='form-body'>
											<div className='row mb-lg-4 mb-3'>
												<div className='col-lg-2 col-12'>
													<label htmlFor='full-name' className=''>
														الإسم الكامل
													</label>
												</div>
												<div className='col-lg-9 col-12'>
													<div className='input-icons'>
														<User />
													</div>
													<input
														type='text'
														id='full-name'
														name='name'
														value={user?.name}
														disabled
													/>
												</div>
											</div>

											<div className='row mb-lg-4 mb-3'>
												<div className='col-lg-2 col-12'>
													<label htmlFor='user-name' className=''>
														اسم المستخدم
													</label>
												</div>
												<div className='col-lg-9 col-12'>
													<div className='input-icons'>
														<User />
													</div>
													<input
														type='text'
														id='full-name'
														name='name'
														value={user?.user_name}
														disabled
													/>
												</div>
											</div>
											<div className='row mb-lg-4 mb-3'>
												<div className='col-lg-2 col-12'>
													<label htmlFor='job-title' className=''>
														الدور الوظيفي
													</label>
												</div>
												<div className='col-lg-9 col-12'>
													<input
														type='text'
														id='role'
														name='role'
														value={user?.role}
														disabled
													/>
												</div>
											</div>

											<div className='row mb-lg-4 mb-3'>
												<div className='col-lg-2 col-12'>
													<label htmlFor='email' className=''>
														البريد الإلكتروني
													</label>
												</div>
												<div className='col-lg-9 col-12'>
													<div className='input-icons'>
														<Message />
													</div>
													<input
														type='email'
														id='email'
														name='email'
														value={user?.email}
														disabled
													/>
												</div>
											</div>
											<div className='row mb-lg-4 mb-3'>
												<div className='col-lg-2 col-12'>
													<label htmlFor='phone-number' className=''>
														رقم الهاتف
													</label>
												</div>
												<div className='col-lg-9 col-12'>
													<div className='input-icons'>
														<Mobile />
													</div>

													<input
														type='text'
														id='phonenumber'
														name='phonenumber'
														maxLength={9}
														value={
															user?.phonenumber?.startsWith("+966")
																? user?.phonenumber?.slice(4)
																: user?.phonenumber?.startsWith("00966")
																? user?.phonenumber?.slice(5)
																: user?.phonenumber
														}
														disabled
													/>
												</div>
											</div>
											<div className='row mb-lg-4 mb-3'>
												<div className='col-lg-2 col-12 d-flex align-items-center'>
													<label htmlFor='personal-image' className=''>
														الصورة الشخصية
													</label>
												</div>
												<div className='col-2'>
													<img
														width='100%'
														src={user?.image}
														alt={user?.name}
													/>
												</div>
											</div>
											<div className='row mb-lg-4 mb-3'>
												<div className='col-lg-2 col-12'>
													<label htmlFor='status' className=''>
														الحالة
													</label>
												</div>
												<div className='col-lg-9 col-12'>
													<input
														type='text'
														id='status'
														name='status'
														value={user?.status}
														disabled
													/>
												</div>
											</div>
										</div>
										<div className='form-footer'>
											<div className='row d-flex justify-content-center align-items-center'>
												<div className='col-6'>
													<button
														className='close-btn'
														onClick={() => navigate("/employees")}>
														إلغاء
													</button>
												</div>
											</div>
										</div>
									</>
								)}
							</form>
						</div>
					</Box>
				</Modal>
			</div>
		</>
	);
};

export default UserData;
