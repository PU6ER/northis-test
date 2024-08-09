import Button from '@mui/material/Button'
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.scss'

const Layout = () => {
	return (
		<div className={styles.layout}>
			<header className={styles.header}>
				<form className={styles.form}>
					<input
						type='text'
						placeholder='Введите поисковой запрос'
						className={styles.search}
					/>
					<Button variant='contained' size='large' color='primary'>
						Искать
					</Button>
				</form>
			</header>
			<Outlet />
		</div>
	)
}

export default Layout
