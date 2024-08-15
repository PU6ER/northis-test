import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/home/HomePage'
import Layout from './pages/layout/Layout'
import ResultsPage from './pages/results/ResultsPage'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='results/:query' element={<ResultsPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
