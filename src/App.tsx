import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/home/Home'
import Layout from './pages/layout/Layout'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />
					{/* <Route path='movie/:movieId' element={<CardPage />} />
					<Route path='top' element={<TopPage />} />
					<Route path='upcoming' element={<UpcomingPage />} /> */}
				</Route>

				<Route path='/dashboard'></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
