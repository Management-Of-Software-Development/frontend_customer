import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, forcePage, initialPage, onPageChange }) => {
	return (
		<>
			<ReactPaginate
				forcePage={forcePage}
				pageRangeDisplayed={5}
				marginPagesDisplayed={2}
				pageCount={pageCount}
				onPageChange={onPageChange}
				containerClassName="pag-list"
				pageClassName="pag-item"
				nextClassName="pag-next"
				previousClassName="pag-prev"
				pageLinkClassName="pag-item-link"
				previousLinkClassName="pag-prev-link"
				nextLinkClassName="pag-next-link"
				disabledClassName="pag-disable"
				activeClassName="pag-active"
				breakClassName="pag-item"
				breakLinkClassName="pag-item-link"
				nextLabel="Next"
				previousLabel="Previous"
			/>
		</>
	);
};
export default Pagination;
