import React, { useEffect } from "react";

// Icons
import { BsBoxSeam } from "react-icons/bs";
import { PiToolboxLight } from "react-icons/pi";
import { BsSearch } from "react-icons/bs";

import { useSearchInStoreCategoriesMutation } from "../../store/apiSlices/categoriesApi";
import { PagesDropdown } from "../../components";

const dropDownData = {
	main_title: "اضافة جديدة",
	subMenu: [
		{
			id: 1,
			sub_path: "AddTasks",
			sub_title: " اضافة نشاط منتجات",
			icon: <BsBoxSeam />,
		},
		{
			id: 2,
			sub_path: "add-service-Tasks",
			sub_title: " اضافة نشاط خدمات",
			icon: <PiToolboxLight />,
		},
	],
};

const SearchInCategories = (props) => {
	const {
		setCategoriesData,

		setCurrentPage,
		setPageCount,

		search,
		setSearch,
		pageTarget,
		rowsCount,
	} = props;

	const [searchInStoreCategories] = useSearchInStoreCategoriesMutation();

	// handle search categories
	useEffect(() => {
		const debounce = setTimeout(() => {
			if (search !== "") {
				const fetchData = async () => {
					try {
						const response = await searchInStoreCategories({
							query: search,
						});

						setCategoriesData(
							response.data.data?.store_categories ??
								response.data.data?.etlobha_categories
						);

						setCurrentPage(response.data?.data?.store_current_page);
						setPageCount(response.data?.data?.store_page_count);
					} catch (error) {
						console.error("Error fetching categories:", error);
					}
				};

				fetchData();
			}
		}, 500);
		return () => {
			clearTimeout(debounce);
		};
	}, [search, pageTarget, rowsCount]);

	return (
		<>
			<div className='d-flex flex-md-row flex-column-reverse  justify-content-start align-items-center gap-3 mb-2'>
				<div className='search-input input-box w-100 w-md-49'>
					<input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						type='text'
						name='search'
						id='search'
						autoComplete='false'
						placeholder='ابحث في المهام'
					/>
					<BsSearch />
				</div>
				<div className='add-Tasks-bt-box  w-100  w-md-49'>
					<PagesDropdown dropDownData={dropDownData} />
				</div>
			</div>
		</>
	);
};

export default SearchInCategories;
