import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../css/body/characterDetail.css';
import useFetchCharacter from '../../api/apiCharacters';

const CharacterDetail = () => {
  const { id } = useParams();
  const character = useFetchCharacter(id);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" id="containerDetail">
      <div className="row">
        <div className='cardDetail'>
            <div className="col-md-8" id='colImage'>
                <img src={character.image} alt={character.name} className="card-img" />
            </div>
            <div className="col-md-10" id="colDatos">
                <h2 className="character-name">{character.name}</h2>
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
    </div>
  );
};

export default CharacterDetail;
