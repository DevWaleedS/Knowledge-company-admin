import React from "react";

// Third party
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { closeProductHintModal } from "../../../store/slices/ImportProductHintModal";

// MUI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 769,
	maxWidth: "90%",
	height: 402,
	bgcolor: "#fff",
	border: "1px solid #707070",
	borderRadius: "16px",
	boxShadow: 24,
	"@media(max-width:768px)": {
		height: "auto",
	},
};

const headingStyle = {
	fontSize: "24px",
	fontWight: 500,
	letterSpacing: "0px",
	color: "#1DBBBE",
};

const contentStyles = {
	whiteSpace: "normal",
	fontSize: "24px",
	fontWight: 400,
	letterSpacing: "0px",
	color: "#011723",
};

const AddProductFromStoreModal = () => {
	const { isOpenProductHintModal } = useSelector(
		(state) => state.ImportProductHintModal
	);
	const dispatch = useDispatch(false);
	const navigate = useNavigate();

	return (
		<div className='add-category-form' open={isOpenProductHintModal}>
			<Modal
				onClose={() => dispatch(closeProductHintModal())}
				open={isOpenProductHintModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box component={"div"} sx={style}>
					<div
						className='text-center add-product-from-store'
						style={{ padding: "45px 45px 0 45px" }}>
						<h3 className='my-4' style={headingStyle}>
							مرحبا بك في سوق المعرفة
						</h3>
						<div className='content' style={{ marginBottom: "90px" }}>
							<p style={contentStyles}>
								عند اختيارك منتجات من سوق المعرفة{" "}
								<span style={{ fontWeight: 500 }}>
									{" "}
									سيتم اعتماد تفاصيل المنتج الخاص بنا{" "}
								</span>{" "}
								و يمكنك التعديل عليها بعد شرائها
							</p>
						</div>
					</div>
					<div className='add-product-from-store-footer d-flex justify-between'>
						<button
							onClick={() => {
								navigate("SouqOtlobha");
								dispatch(closeProductHintModal());
							}}
							style={{
								color: "#fff",
								fontSize: "24px",
								fontWight: 500,
								height: "70px",
								backgroundColor: "#1DBBBE",
								borderRadius: " 0 0 16px 0",
							}}
							className='w-50'>
							سوق المعرفة
						</button>
						<button
							onClick={() => dispatch(closeProductHintModal())}
							style={{
								color: "#1DBBBE",
								fontSize: "24px",
								fontWight: 500,
								height: "70px",
								backgroundColor: "#FFF",
								borderTop: "1px solid #1DBBBE",
								borderRadius: " 0 0 0 16px",
							}}
							className='w-50'>
							عودة
						</button>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default AddProductFromStoreModal;
