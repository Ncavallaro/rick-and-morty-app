const search = ({handleNameFilterChange,handleLocationFilterChange}) => {

    return (
        <form className="d-flex" role="search">
            <div className='containerSearch'>
                <input className="form-control me-2" type="search" placeholder="Name" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit" onClick={handleNameFilterChange}>Search</button>
            </div>
            <div className='containerSearch'>
                <input className="form-control me-2" type="search" placeholder="Location" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit" onClick={handleLocationFilterChange}>Search</button>
            </div>
        </form>
    );
};

export default search;
