import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Layout from './components/Layout'


function App() {
	return (
		<Router>
			<Route exact component={Layout} />
		</Router>
	)
}

export default App
