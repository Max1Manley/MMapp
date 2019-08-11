import React from 'react';

const Favorites = ({ favsData, removeFavorite }) => {

	return(
		<div className="center">
			{
				favsData.map((favs, i) => {						
					let adn = "Unknown Artist";
					if (favsData[i].artistDisplayName) { adn = favsData[i].artistDisplayName };
					let abd = "";
					if (favsData[i].artistBeginDate && favsData[i].artistEndDate) { abd = `(${favsData[i].artistBeginDate}-${favsData[i].artistEndDate})` }
					else if (favsData[i].artistBeginDate) { abd = `(b. ${favsData[i].artistBeginDate})` };
					let tst = "";
					if (favsData[i].title) {tst = `${favsData[i].title}`};
					let tsod = "";
					if (favsData[i].objectDate) { tsod = `, ${favsData[i].objectDate}` };	


					return(
						<div className="container white" key={i}>
							<a href={favsData[i].primaryImage} target="_blank">
								<img 
								className="shadow artImg"
								alt="Not Public Domain"
								src={favsData[i].primaryImageSmall} />
							</a>
							<p className="pointer itemCenter shorterWidth" onClick={() => removeFavorite(favsData[i].objectID)}> Remove From Favorites </p>
							<ul className="shadow itemCenter">
								<li><strong>{adn} </strong>{abd}</li>
								<li><strong className="ital">{tst}</strong>{tsod}</li>
								<li className="smalltxt">{favsData[i].medium}</li>
							</ul>
						</div>
					)	
				})	
			}

		</div>
	)
}

export default Favorites;