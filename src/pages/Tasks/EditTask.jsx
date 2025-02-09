import React, { useContext, useEffect, useState } from "react";

// third party
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import { useNavigate, useParams } from "react-router-dom";

// MUI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// Redux
import { useDispatch } from "react-redux";
import { openAddSubTasks } from "../../store/slices/AddSubTasks-slice";

// Components
import AddSubTasks from "../nestedPages/AddSubTasks";

// Helpers
import { CircularLoading } from "../../HelperComponents";

// Icons
import { AiOutlinePlus } from "react-icons/ai";
import { DeleteIcon, UploadIcon } from "../../data/Icons";

// Context
import Context from "../../Context/context";
import { LoadingContext } from "../../Context/LoadingProvider";
import {
	useEditTasksByIdMutation,
	useGetTasksByIdQuery,
} from "../../store/apiSlices/categoriesApi";
import { Close } from "@mui/icons-material";

const style = {
	position: "fixed",
	top: "80px",
	left: "0%",
	transform: "translate(0%, 0%)",
	width: "70%",
	height: "100%",
	overflow: "auto",
	bgcolor: "#fff",
	paddingBottom: "80px",

	"@media(max-width:1400px)": {
		width: "80%",
	},
	"@media(max-width:768px)": {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		backgroundColor: "#F6F6F6",
		paddingBottom: 0,
	},
};

const EditTasks = () => {
	// get Tasks by is
	const { id } = useParams();
	const path_name = window.location.pathname;
	const { data: currentTasks, isFetching } = useGetTasksByIdQuery(id);

	const dispatch = useDispatch(true);
	const navigate = useNavigate();
	const contextStore = useContext(Context);
	const { subCategories, setSubCategories } = contextStore;
	const LoadingStore = useContext(LoadingContext);
	const { setLoadingTitle } = LoadingStore;
	const [Tasks, setTasks] = useState({
		name: "",
	});
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		mode: "onBlur",
		defaultValues: {
			name: "",
		},
	});

	const [TasksError, setTasksError] = useState({
		name: "",
		icon: "",
	});

	// handle images size
	const maxFileSize = 1 * 1024 * 1024; // 1 MB;
	// Use state  set banners
	const [icons, setIcons] = React.useState([]);
	const onChange = (imageList, addUpdateIndex) => {
		// Check image size before updating state
		const isSizeValid = imageList.every(
			(image) => image.file.size <= maxFileSize
		);
		const errorMessage = "حجم الصورة يجب أن لا يزيد عن 1 ميجابايت.";

		if (!isSizeValid) {
			setIcons([]);
			toast.warning(errorMessage, {
				theme: "light",
			});
			setTasksError({
				...TasksError,
				icon: errorMessage,
			});
		} else {
			setIcons(imageList);
			setTasksError({ ...TasksError, icon: null });
		}
	};

	/** to get all data from api */
	useEffect(() => {
		setTasks({
			...Tasks,
			name: currentTasks?.categories?.name,
		});
	}, [currentTasks?.categories]);

	// to update the categories if any item is change
	useEffect(() => {
		reset(Tasks);
	}, [Tasks, reset]);

	// handle edit current Tasks by id
	const [editTasksById] = useEditTasksByIdMutation();
	const handleUpdateTasks = async (data) => {
		setLoadingTitle(
			path_name.includes("edit-service-Tasks")
				? "جاري تعديل نشاط الخدمات"
				: "جاري تعديل نشاط المنتجات"
		);
		let formData = new FormData();
		formData.append("_method", "PUT");
		formData.append("name", data?.name);
		if (path_name.includes("edit-service-Tasks")) {
			formData.append("is_service", 1);
		}

		if (icons?.length > 0) {
			formData.append("icon", icons[0]?.file);
		}

		subCategories.forEach((subTasks, index) => {
			if (subTasks?.name) {
				formData.append(`data[${index}][name]`, subTasks.name);
				formData.append([`data[${index}][id]`], subCategories[index]?.id || "");
			}
		});

		// making request...
		try {
			const response = await editTasksById({
				id: currentTasks?.categories?.id,
				body: formData,
			});

			// Handle response
			if (
				response.data?.success === true &&
				response.data?.data?.status === 200
			) {
				setLoadingTitle("");
				navigate("/Tasks");
				setSubCategories([]);
			} else {
				setLoadingTitle("");

				setTasksError({
					...TasksError,
					name: response?.data?.message?.en?.name?.[0],
					icon: response?.res?.data?.message?.en?.name?.[0],
				});

				// Handle display errors using toast notifications
				toast.error(
					response?.data?.message?.ar
						? response.data.message.ar
						: response.data.message.en,
					{
						theme: "light",
					}
				);

				Object.entries(response?.data?.message?.en)?.forEach(
					([key, message]) => {
						toast.error(message[0], { theme: "light" });
					}
				);
			}
		} catch (error) {
			console.error("Error changing categories:", error);
		}
	};

	/** to edit the sub Tasks */
	const updateSubCatChanged = (e, index) => {
		const newArray = subCategories?.map((item, i) => {
			if (index === i) {
				return { ...item, name: e.target.value };
			} else {
				return item;
			}
		});
		setSubCategories(newArray);
	};

	/** to get all sub categories  */
	useEffect(() => {
		if (currentTasks?.categories) {
			for (let i = 0; i < currentTasks?.categories?.subTasks?.length; i++) {
				setSubCategories((subCategories) => [
					...subCategories,
					{
						id: currentTasks?.categories?.subTasks[i]?.id,
						name: currentTasks?.categories?.subTasks[i]?.name,
					},
				]);
			}
			setIcons([currentTasks?.categories?.icon]);
		}
	}, [currentTasks?.categories]);

	return (
		<>
			<Helmet>
				<title>
					{`لوحة تحكم المعرفة  |	${
						path_name.includes("edit-service-Tasks")
							? "تعديل نشاط الخدمات"
							: "تعديل نشاط المنتجات"
					}   	 `}
				</title>
			</Helmet>
			<div className='' open={true}>
				<Modal
					open={true}
					onClose={() => {
						setSubCategories([]);
						navigate("/Tasks");
					}}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'>
					<Box component={"div"} sx={style}>
						<div className='add-form-wrapper'>
							<div className='d-flex'>
								<div className='col-12'>
									<div className='form-title'>
										<h5 className='mb-3'>
											{" "}
											{path_name.includes("edit-service-Tasks")
												? "تعديل نشاط الخدمات"
												: "تعديل نشاط المنتجات"}{" "}
										</h5>

										<p>قم بتحديث النشاط والمعلومات الضرورية من هنا</p>
									</div>
								</div>
							</div>

							{isFetching ? (
								<div
									className='d-flex justify-content-center align-items-center'
									style={{ height: "200px" }}>
									<CircularLoading />
								</div>
							) : (
								<form
									className='form-h-full'
									onSubmit={handleSubmit(handleUpdateTasks)}>
									<div className='form-body'>
										<div className='row mb-md-5 mb-3'>
											<div className='col-md-3 col-12'>
												<label htmlFor='add-icon'>
													ايقونة النشاط
													<span className='important-hint'>*</span>
												</label>
											</div>
											<div className='col-md-7 col-12'>
												<div class='uplod-wrap'>
													<ImageUploading
														value={icons}
														onChange={onChange}
														dataURLKey='data_url'
														acceptType={["jpg", "png", "jpeg", "webp"]}>
														{({ onImageUpload, dragProps }) => (
															<div>
																<div
																	className='add-image-btn-box '
																	onClick={() => {
																		onImageUpload();
																	}}
																	{...dragProps}>
																	<div className='d-flex flex-column justify-center align-items-center'>
																		<div className='add-image-btn d-flex flex-column justify-center align-items-center'>
																			<UploadIcon />
																			<label
																				htmlFor='add-image'
																				className='d-flex justify-center align-items-center'>
																				اسحب الصورة هنا
																			</label>
																		</div>
																		<span>
																			( سيتم قبول الصور jpeg & png & jpg & webp)
																		</span>
																		<div className='tax-text mb-0'>
																			(الحد الأقصى للصورة 1MB)
																		</div>
																	</div>
																</div>

																<div className='tax-text '>
																	المقاس الأنسب 110 بكسل عرض و 110 بكسل ارتفاع
																</div>
															</div>
														)}
													</ImageUploading>
												</div>

												<div className='banners-preview-container'>
													{icons[0] ? (
														<div className='banner-preview'>
															<Close
																className='close-icon'
																onClick={() => setIcons([])}
															/>

															<img
																src={icons[0]?.data_url || icons[0]}
																alt=''
															/>
														</div>
													) : null}
												</div>
											</div>
											<div className='col-md-3 col-12'></div>
											<div className='col-md-7 col-12'>
												{TasksError?.icon && (
													<span className='fs-6 text-danger'>
														{TasksError?.icon}
													</span>
												)}
											</div>
										</div>
										<div className='row mb-md-5 mb-3'>
											<div className='col-md-3 col-12'>
												<label htmlFor='Tasks-name'>
													{" "}
													{path_name.includes("edit-service-Tasks")
														? "اسم نشاط الخدمة الرئيسي"
														: "اسم نشاط المنتج الرئيسي"}
													<span className='important-hint'>*</span>
												</label>
											</div>
											<div className='col-md-7 col-12'>
												<input
													type='text'
													id='Tasks-name'
													placeholder='أدخل اسم النشاط الرئيسي'
													name='name'
													{...register("name", {
														required: "حقل الاسم مطلوب",
														pattern: {
															value: /^[^-\s][\u0600-\u06FF-A-Za-z0-9 ]+$/i,
															message:
																"الاسم يجب أن يكون نصاً ولا يحتوي على حروف خاصه مثل الأقوس والرموز",
														},
													})}
												/>
											</div>
											<div className='col-md-3 col-12'></div>
											<div className='col-md-7 col-12'>
												<span className='fs-6 text-danger'>
													{TasksError?.name}
													{errors?.name && errors.name.message}
												</span>
											</div>
										</div>
										{subCategories &&
											subCategories.map(
												(subTasks, index) =>
													subTasks?.name && (
														<div className='row mb-md-5 mb-3' key={index}>
															<div className='col-md-3 col-12'>
																<label
																	htmlFor='Tasks-name'
																	style={{
																		color: "#1DBBBE",
																	}}>
																	فرعي رقم {index + 1}
																</label>
															</div>
															<div className='col-md-7 col-12 d-flex justify-content-end align-items-center gap-2'>
																<input
																	className='flex-1'
																	type='text'
																	id='Tasks-name'
																	value={subTasks?.name}
																	onChange={(e) =>
																		updateSubCatChanged(e, index)
																	}
																	style={{
																		color: "#1DBBBE",
																		border: "1px solid #1DBBBE",
																	}}
																/>
																<DeleteIcon
																	onClick={() => {
																		setSubCategories((subCategories) => [
																			...subCategories.filter(
																				(sub) => sub?.name !== subTasks?.name
																			),
																		]);
																	}}
																	style={{
																		width: "25px",
																		height: "25px",
																		cursor: "pointer",
																	}}
																/>
															</div>
														</div>
													)
											)}

										<div className='row mb-md-5 mb-3'>
											<div className='col-md-3 col-12'></div>
											<div className='col-md-7 col-12'>
												<button
													type='button'
													className='add-new-cate-btn w-100'
													onClick={() => {
														dispatch(openAddSubTasks());
													}}>
													<AiOutlinePlus />
													<span className='me-2'>اضافة نشاط فرعي جديد</span>
												</button>
											</div>
										</div>
									</div>

									<div className='form-footer'>
										<div className='row d-flex justify-content-center align-items-center'>
											<div className='col-lg-4 col-6'>
												<button className='save-btn' type='submit'>
													حفظ
												</button>
											</div>
											<div className='col-lg-4 col-6'>
												<button
													type='button'
													className='close-btn'
													onClick={() => {
														navigate("/Tasks");
														setSubCategories([]);
													}}>
													إلغاء
												</button>
											</div>
										</div>
									</div>
								</form>
							)}
						</div>
					</Box>
				</Modal>
				<AddSubTasks />
			</div>
		</>
	);
};

export default EditTasks;
