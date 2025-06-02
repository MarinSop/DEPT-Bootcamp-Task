import './PaginationComponent.css'

const Pagination = ({currentPage, totalPages, onPageChange}) => (
    <div className="pagination">
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>&laquo;</button>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>&lsaquo;</button>
        <span>{currentPage}/{totalPages}</span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>&rsaquo;</button>
        <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>&raquo;</button>
    </div>
)

export default Pagination;