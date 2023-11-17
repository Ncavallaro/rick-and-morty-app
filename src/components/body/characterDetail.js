import { useParams } from "react-router-dom";
import "../../css/body/characterDetail.css";
import useFetchCharacter from "../../api/apiCharacters";

const CharacterDetail = () => {
  const { id } = useParams();
  const character = useFetchCharacter(id);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" id="containerDetail">
      <div id="containerButton">
        <div className="row">
          <div className="cardDetail">
            <div className="col-md-4" id="colImage">
              <img
                src={character.image}
                alt={character.name}
                className="card-img"
              />
            </div>
            <div className="col-md-10" id="colDatos">
              <h2 className="character-name"><strong>{character.name}</strong></h2>
              <div className='underline'></div>
              <p className="character-info">
                <strong>Status:</strong> {character.status}
              </p>
              <p className="character-info">
                <strong>Species:</strong> {character.species}
              </p>
              <p className="character-info">
                <strong>Gender:</strong> {character.gender}
              </p>
              <p className="character-info">
                <strong>Origin:</strong> {character.origin.name}
              </p>
              <p className="character-info">
                <strong>Location:</strong> {character.location.name}
              </p>
            </div>
          </div>
        </div>
        <button type="button" className="btn btn-outline-success">
        Volver
      </button>
      </div>
    </div>
  );
};

export default CharacterDetail;
