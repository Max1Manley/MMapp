import React from 'react';

const About = () => {

	return(
		<div className="center about">
			This App was built using <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> and <a href ="https://metmuseum.github.io/" target="_blank" rel="noopener noreferrer">The Metropolitan Museum of Art Collection API.</a>
			<br/>

			<p>
			The three images shown on the home page are randomly chosen from a selected list of 2896 different works of art.
			<br/>
			Searching will provide all works of art from the Met that contain the search query in their data.
			<br/>
			All displayed artwork can be clicked on to view in full resolution.
			<br/>
			If the artwork is not in the public domain it will not be available for viewing, but the information will still be available.
			<br/>
			</p>

			App created by Max Manley
			<br/>
			<a href="https://max1manley.github.io" target="_blank" rel="noopener noreferrer">Portfolio</a>
			<br/>
			<a href="https://www.linkedin.com/in/max1manley" target="_blank" rel="noopener noreferrer">Linkedin</a>
		</div>
	);
}

export default About;