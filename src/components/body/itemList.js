import '../../css/body/itemList.css'
import { Link } from 'react-router-dom';

const itemList = (props) => {
  return (
    <div className="container" id="containerList">
        <div className="row" id="rowList">
          {props.characters.map(character => (
            <Link to={`/character/${character.id}`} className='col-lg-4 col-md-6 col-sm-12' id='Link' key={character.id}>
              <div key={character.id} >
                <div className="card mb-3">
                  <img src={character.image} className="card-img-top" alt={character.name} />
                  <div className="card-body">
                    <h3 className="card-title">{character.name}</h3>
                    <p className="card-text">
                      <strong>Location:</strong> {character.location.name}
                      <br />
                      <strong>Origin:</strong> {character.origin.name}
                      <br />
                      <strong>Gender:</strong> {character.gender}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
  )
}

export default itemList;