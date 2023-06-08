const search = ({handleNameFilterChange,handleLocationFilterChange}) => {

    return (
        <form className="d-flex" role="search">
            <div className='containerSearch'>
                <input className="form-control me-2" type="search" placeholder="Name" aria-label="Name"/>
                <button className="btn btn-outline-success" type="submit"  onClick={(event) => handleNameFilterChange(event)}>Search Name</button>
            </div>
            <div className='containerSearch'>
                <input className="form-control me-2" type="search" placeholder="Location" aria-label="Location"/>
                <button className="btn btn-outline-success" type="submit" onClick={(event) => handleLocationFilterChange(event)}>Search Location</button>
            </div>
        </form>
    );
};

export default search;
