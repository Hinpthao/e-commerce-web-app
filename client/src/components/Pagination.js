import React from 'react';
import '../style/Panigation.css';

const Pagination = ({ pagination, onPageChange }) => {
    const { limit, page, totalProducts } = pagination;
    const totalPages = Math.ceil(totalProducts / limit);

    const handlePageChange = (newPage) => {
        if(onPageChange) {
            onPageChange(newPage)
        }
    }
 
    return (
        <div style={{textAlign: "center", width: "100%", margin: "30px 0 30px 0"}}>
            <nav className="pagination-outer" aria-label="Page navigation">
                <ul className="pagination">
                    <li className="page-item" 
                        style={{marginLeft: "auto", pointerEvents: page <= 1 ? 'none' : 'auto'}}
                        onClick={() => handlePageChange(page - 1)} 
                        >
                        <a className="page-link" aria-label="Previous" >
                            <span aria-hidden="true">«</span>
                        </a>
                    </li>
                    <li className="page-item" 
                        style={{marginRight: "auto", pointerEvents: page >= totalPages ? 'none' : 'auto'}}
                        onClick={() => handlePageChange(page + 1)}
                            >
                        <a className="page-link" aria-label="Next">
                            <span aria-hidden="true">»</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;