import React from "react";

// Third party
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

// MUI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DeleteIcon, EditIcon } from "../../data/Icons";

// Icons

// Modal Style
const style = {
	position: "fixed",
	top: "80px",
	left: "0%",
	transform: "translate(0%, 0%)",
	width: "85%",
	height: "100%",
	overflow: "auto",
	bgcolor: "#f8f9fa",
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

const rolesData = [
	{
		id: 1,
		name: "مدير الموارد البشرية",
		description: "مدير الموارد البشرية",
	},
	{
		id: 2,
		name: "مدير الموارد البشرية",
		description: "مدير الموارد البشرية",
	},
	{
		id: 3,
		name: "مدير الموارد البشرية",
		description: "مدير الموارد البشرية",
	},
	{
		id: 4,
		name: "مدير الموارد البشرية",
		description: "مدير الموارد البشرية",
	},
];
const JobRoles = () => {
	//
	const navigate = useNavigate();

	return (
		<>
			<Helmet>
				<title>لوحة تحكم المعرفة | الأدوار الوظيفية</title>
			</Helmet>
			<div className='' open={true}>
				<Modal
					open={true}
					onClose={() => navigate("/employees")}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'>
					<Box component={"div"} sx={style} className='nested-pages-modal'>
						<section className='job-title-page'>
							<div className='form-title mb-md-5 mb-3'>
								<div className='row header-row'>
									<div className='col-md-6 col-12'>
										<h5 className='mb-4'> الأدوار الوظيفية</h5>
										<div className='head-category '>
											<div className='row'>
												<nav aria-label='breadcrumb'>
													<ol className='breadcrumb'>
														<li className='breadcrumb-item'>
															<Link to='/employees' className='me-2'>
																جدول الموظفين
															</Link>
														</li>

														<li
															className='breadcrumb-item active'
															aria-current='page'>
															الأدوار الوظيفية
														</li>
													</ol>
												</nav>
											</div>
										</div>
									</div>
									<div className='col-md-6 col-12 d-flex justify-content-end'>
										<div className='create-job-title-btn'>
											<button onClick={() => navigate("CreateRole")}>
												إنشاء دور
											</button>
										</div>
									</div>
								</div>
							</div>

							<div className='job-titles-wrapper mb-md-5 mb-3'>
								{rolesData?.map((role, index) => (
									<div className='row mb-3' key={index}>
										<div className='col-12'>
											<div className='job-box d-flex justify-content-between align-items-center'>
												<span className='job-name'>{role?.name}</span>
												<div className='job-btn-group'>
													<button
														className='edit-btn'
														onClick={() => navigate(`EditRole/${role?.id}`)}>
														<EditIcon title='تعديل الدور' />
														<span className='me-2'>تحرير</span>
													</button>
													<button className='delete-btn me-md-3'>
														<DeleteIcon title='حذف الدور' />
														<span className='me-md-2'>حذف</span>
													</button>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
							<div className='row m-0 mb-3'>
								<div className='col-12'>
									<div className='close-btn d-flex justify-content-center '>
										<button onClick={() => navigate("/employees")}>
											إغلاق
										</button>
									</div>
								</div>
							</div>
						</section>
					</Box>
				</Modal>
			</div>
		</>
	);
};

export default JobRoles;
