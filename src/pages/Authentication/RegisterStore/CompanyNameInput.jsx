import React from "react";

const CompanyNameInput = ({
	registerInfo,
	handleRegisterInfo,
	companyNameError,
}) => {
	return (
		<>
			<div className='name'>
				<h5 className='d-flex flex-row'>
					اسم الشركة أو المؤسسة<span style={{ color: "red" }}>*</span>
				</h5>
				<input
					type='text'
					name='company_name'
					value={registerInfo?.company_name}
					onChange={handleRegisterInfo}
					required
					placeholder='ادخل اسم الشركة أو المؤسسة'
				/>
			</div>

			{companyNameError && (
				<p
					className={"wrong-text w-100"}
					style={{
						color: "red",
						marginTop: "-20px",
						direction: "rtl",
					}}>
					{companyNameError}
				</p>
			)}
		</>
	);
};

export default CompanyNameInput;
