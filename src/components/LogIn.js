import React from 'react';

const LogIn = ({ onSubmitLogIn, emailChange, passwordChange, onClickRegister }) => {

	return(
		<div className="flexVC center moreTopMargin"> 
			<article >
				<main>
				  <div>
				    <fieldset id="sign_up">
				      <legend>Sign In</legend>
				      <div>
				        <label htmlFor="email-address">Email</label>
				        <br/>
				        <input 
				        	type="email" 
				        	name="email-address" 
				        	id="email-address" 
				        	onChange={emailChange}
				        />
				      </div>
				      <div >
				        <label htmlFor="password">Password</label>
				        <br/>
				        <input 
					        type="password" 
					        name="password"  
					        id="password" 
					        onChange={passwordChange}
				        />
				      </div>
				    </fieldset>
				    <div>
				    <br/>
				      <input 
				      	onClick={onSubmitLogIn}
					    type="submit" 
					    value="Click to Sign in" 
				      />
				    </div>
				    <div >
				      <p onClick={onClickRegister}>Register</p>
				    </div>
				  </div>
				</main>
			</article>
		</div>
	);
}

export default LogIn;