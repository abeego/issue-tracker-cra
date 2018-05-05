import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
	<div>
		<h2>
			Welcome back!
		</h2>
		<Link href="/login" to="/login">Log in</Link>
		<Link href="/register" to="/register">Sign in</Link>
	</div>
)

export default Home;
 