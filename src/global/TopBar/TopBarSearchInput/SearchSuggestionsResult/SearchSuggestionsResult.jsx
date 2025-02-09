import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

// css styles
import styles from "./SearchSuggestionsResult.module.css";

// Context
import Context from "../../../../Context/context";

// Redux
import { useDispatch } from "react-redux";
import { openVerifyModal } from "../../../../store/slices/VerifyStoreModal-slice";

import { openDelegateRequestAlert } from "../../../../store/slices/DelegateRequestAlert-slice";
import { openProductHintModal } from "../../../../store/slices/ImportProductHintModal";

const SearchSuggestionsResult = ({
	suggestionsResult,
	setSearchSuggestions,
	setSearch,
}) => {
	const navigate = useNavigate();
	// -------------------------------------------------------

	const dispatch = useDispatch(false);
	const dispatchVerifyModal = useDispatch(false);
	// ---------------------------------------------------------

	// to handle CoursesTraining and Explain in Academy Section
	const academyToggleContext = useContext(Context);
	const { setTogglePag } = academyToggleContext;
	// ---------------------------------------------------------

	// to handle open all pages
	const handleRoute = (item) => {
		if (item?.sectionName === "توثيق المتجر") {
			dispatchVerifyModal(openVerifyModal());
		} else if (item?.sectionName === "الدورات التدريبية") {
			navigate(`${item?.route}`);
			setTogglePag(1);
		} else if (item?.sectionName === "شروحات") {
			navigate(`${item?.route}`);
			setTogglePag(2);
		} else if (item?.sectionName === "التسويق عبر المشاهير") {
			window.open(item?.route, "_blank");
		} else if (item?.sectionName === "طلب مندوب") {
			navigate(`${item?.route}`);
			dispatch(openDelegateRequestAlert());
		} else if (item?.sectionName === "سوق المعرفة") {
			navigate(`${item?.route}`);
			dispatch(openProductHintModal());
		} else {
			navigate(`${item?.route}`);
		}
	};

	return (
		<>
			<ul className={styles.search_suggestions_result_wrapper}>
				{suggestionsResult?.map((item) => (
					<li
						key={item?.id}
						onClick={() => {
							handleRoute(item);
							setSearch("");
							setSearchSuggestions(null);
						}}>
						<div className='d-flex justify-content-start align-items-center gap-2'>
							{item?.icon}
							<div className={styles.section_name}>{item?.sectionName}</div>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default SearchSuggestionsResult;
