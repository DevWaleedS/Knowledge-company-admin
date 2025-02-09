import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

// MUI
import { TasksTable } from "../../components/Tables";

// Components
import { Breadcrumb, PageHint } from "../../components";

// RTK Query
import { useGetCategoriesDataQuery } from "../../store/apiSlices/categoriesApi";
import SearchInCategories from "./SearchInTasks";

const Tasks = () => {
	const [search, setSearch] = useState("");
	const [categoriesData, setCategoriesData] = useState([]);

	const [pageTarget, setPageTarget] = useState(1);
	const [rowsCount, setRowsCount] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);

	// Fetch categories based on search query and tabSelected
	const {
		data: categories,
		isLoading,
		refetch,
	} = useGetCategoriesDataQuery({
		page: pageTarget,
		number: rowsCount,
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	// ----------------------------------------------------

	return (
		<>
			<Helmet>
				<title>لوحة تحكم المعرفة | إدارة المهام</title>
			</Helmet>
			<div className='Tasks p-lg-3'>
				<Breadcrumb currentPage={"إدارة المهام"} />

				<div className='mb-3'>
					<PageHint
						hint={`من خلال هذا القسم تستطع إدارة مهام الموظفين  `}
						flex={"d-flex  justify-content-start align-items-center gap-2"}
					/>

					<div className='add-Tasks'>
						<SearchInCategories
							search={search}
							setSearch={setSearch}
							categories={categories}
							setPageCount={setPageCount}
							setPageTarget={setPageTarget}
							setCurrentPage={setCurrentPage}
							setCategoriesData={setCategoriesData}
						/>
					</div>
				</div>

				<div className='row'>
					<div className='Tasks-table'>
						<TasksTable
							loading={isLoading}
							rowsCount={rowsCount}
							setRowsCount={setRowsCount}
							pageTarget={pageTarget}
							categories={categoriesData || []}
							setPageTarget={setPageTarget}
							pageCount={pageCount}
							currentPage={currentPage}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Tasks;
