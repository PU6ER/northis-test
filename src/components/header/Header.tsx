import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Header.module.scss'

const Header = () => {
	const [searchQuery, setSearchQuery] = useState('')

	const navigate = useNavigate()
	const { query } = useParams()

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setSearchQuery(e.target.value)
	}
	useEffect(() => {
		if (query) {
			setSearchQuery(query)
		}
	}, [query])
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<form className={styles.form}>
					<input
						type='text'
						placeholder='Введите поисковой запрос'
						className={styles.search}
						value={searchQuery}
						onChange={e => handleSearch(e)}
					/>
					<Button
						variant='contained'
						size='large'
						color='primary'
						onClick={() => navigate('results/' + searchQuery)}
					>
						Искать
					</Button>
				</form>
			</div>
		</header>
	)
}

export default Header
