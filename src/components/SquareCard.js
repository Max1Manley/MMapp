import React from 'react';
import './SquareCard.css';

const SquareCard = ({ theState, nN, searchLength, route}) => {

	//checking if information is available, if true then it is displayed
	let adn = "Unknown Artist";
	if (theState.artistDisplayName) { adn = theState.artistDisplayName };
	let abd = "";
	if (theState.artistBeginDate && theState.artistEndDate) { abd = `(${theState.artistBeginDate}-${theState.artistEndDate})` }
	else if (theState.artistBeginDate) { abd = `(b. ${theState.artistBeginDate})` };
	let tst = "";
	if (theState.title) {tst = `${theState.title}`};
	let tsod = "";
	if (theState.objectDate) { tsod = `, ${theState.objectDate}` };
	let searchTotal = "";	
	if (route === "displaySearch") { searchTotal = `${nN+1} of ${searchLength}` };

	return(
		<div className="container">		
			<div className="center">
				{searchTotal}
			</div>
			<a href={theState.primaryImage} target="_blank">
				<img 
				className="shadow"
				height={window.innerHeight / 1.35}
				width="auto"
				alt="Not Public Domain"
				src={theState.primaryImageSmall} />
			</a>
			<ul className="shadow">
				<li><strong>{adn} </strong>{abd}</li>
				<li><strong className="ital">{tst}</strong>{tsod}</li>
				<li className="smalltxt">{theState.medium}</li>
			</ul>
		</div>
	)
}

export default SquareCard;