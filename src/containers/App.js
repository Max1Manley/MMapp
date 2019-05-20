//Max Manley 2019
import React, { Component } from 'react';
import publicDomain from './publicDomain';
import SquareCard from '../components/SquareCard';
import NavBarSearched from '../components/NavBarSearched';
import Next from '../components/Next';
import Back from '../components/Back';
import About from '../components/About';
import './App.css';

//metropolitan red #e4002b

var nN = 0;

class App extends Component {
	constructor () {
		super();
		this.state = {
			randomsLoaded: 0,
			random0: {},
			random1: {},
			random2: {},
			searched: null,
			route: "",
			test: null,
			nN: 0,
		}
	}

	//fetching random works of art from public domain array
	componentWillMount() {	

		fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${publicDomain[Math.floor(Math.random()*publicDomain.length)]}`)
		.then (response => response.json())
		.then (art => {
			this.setState({
				random0: art,
				randomsLoaded: this.state.randomsLoaded + 1,
			})
		});	
		fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${publicDomain[Math.floor(Math.random()*publicDomain.length)]}`)
		.then (response => response.json())
		.then (art => {
			this.setState({
				random1: art,
				randomsLoaded: this.state.randomsLoaded + 1,
			})
		});	
		fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${publicDomain[Math.floor(Math.random()*publicDomain.length)]}`)
		.then (response => response.json())
		.then (art => {
			this.setState({
				random2: art,
				randomsLoaded: this.state.randomsLoaded + 1,
			})
		});	
	}

	//first fetch returns array of objectIDs related to query and saves list in state
	//second fetch returns data of first item in array
	onSearchChange = (event) => {
		if (event.key === 'Enter'){
			this.setState({	nN: 0, });
			nN = 0;
			fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${event.target.value}`)
			.then (response => response.json())
			.then (art => {
				this.setState({
					searched: art,	
				})
				if (this.state.searched.objectIDs) {
					fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${this.state.searched.objectIDs[0]}`)
					.then(response => response.json())
					.then(art => {
						this.setState({
							test: art,
							route: "displaySearch",
						})
					})					
				} else {
					alert("No Matching Results");
					this.setState({ route: "" });
				}

			})					
		}
	}

	//displays next item in the this.state.searched.objectIDs array
	singleFetch = () =>{
		if (nN < this.state.searched.objectIDs.length - 1){
			fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${this.state.searched.objectIDs[nN+1]}`)
			.then(response => response.json())
			.then(art => {
				this.setState({
					test: art,
					nN: this.state.nN + 1,
				})
				nN++;
			})			
		}
	}

	//displays previous item in the this.state.searched.objectIDs array
	backFetch = () =>{
		if(nN > 0){
			fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${this.state.searched.objectIDs[nN-1]}`)
			.then(response => response.json())
			.then(art => {
				this.setState({
					test: art,
					nN: this.state.nN - 1,
				})
				nN--;
			})			
		}
	}

	onClickHome = () => {
		this.setState({ route: "", });
	}

	onClickAbout = () => {
		this.setState({ route: "About" });
	}

	render() {
		//renders search result
		if (this.state.randomsLoaded >= 3 && this.state.route === "displaySearch" &&  this.state.searched.objectIDs) {
			return (
		    	<div className="App">

		    			<NavBarSearched
		    			onClickAbout={this.onClickAbout}
		    			onClickHome={this.onClickHome}
		    			onSearchChange={this.onSearchChange} />

			      	<div className="flexVC moreTopMargin">
			      		<Back Fetch={this.backFetch} />
			      		<SquareCard 
			      		nN={this.state.nN} 
			      		route={this.state.route} 
			      		searchLength={this.state.searched.objectIDs.length} 
			      		theState={this.state.test} />
			      		<Next Fetch={this.singleFetch} />
			    	</div>
		    	</div>   				
			)
		} else if (this.state.randomsLoaded >= 3 && this.state.route === "About"){
		//renders the about section
			return (
				<div className="App">
	    			<NavBarSearched
	    			onClickAbout={this.onClickAbout}
	    			onClickHome={this.onClickHome}
	    			onSearchChange={this.onSearchChange} />

					<About />
				</div>
			)

		} else if (this.state.randomsLoaded >= 3) {	
		//renders home sections with 3 randomly chosen works of art
        	return (
		    	<div className="App">

	    			<NavBarSearched
	    			onClickAbout={this.onClickAbout}
	    			onClickHome={this.onClickHome}
	    			onSearchChange={this.onSearchChange} />

			      	<div className="white flexVC">
			      		<SquareCard 
			      		nN={this.state.nN} 
			      		route={this.state.route}  
			      		theState={this.state.random0} />
			    	</div>
			    	<div className="lightGrey flexVC">
			    		<SquareCard 
			    		nN={this.state.nN} 
			    		route={this.state.route} 
			    		theState={this.state.random1} />
			    	</div>
			    	<div className="grey flexVC">
			    		<SquareCard 
			    		nN={this.state.nN} 
			    		route={this.state.route} 
			    		theState={this.state.random2} />
		    		</div>
		    	</div>    			
    		)		
    	} else {
    		return <div className="flexVC">Loading...</div>
    	}
	}	

	componentDidMount(){}		
}

//Artist I've learned of/more about while making this.
//henri de toulouse-lautrec
//Gustave Moreau
//el greco


export default App;