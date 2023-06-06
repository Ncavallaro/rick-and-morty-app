import '../../css/body/pagination.css';

const pagination = ({ handleNextPage, handlePreviousPage }) => {

    return (
        <div className='containerPagination'>
          <button type="button" className="btn btn-outline-success" onClick={handlePreviousPage}>Anterior</button>
          <button type="button" className="btn btn-outline-success" onClick={handleNextPage}>Siguiente</button>
        </div>
    );
};

export default pagination;
