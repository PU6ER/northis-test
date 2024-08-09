import Button from '@mui/material/Button'
import styles from './Header.module.scss'

const Header = () => {
	return (
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
	)
}

export default Header
