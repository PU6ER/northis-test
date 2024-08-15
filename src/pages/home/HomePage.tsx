import { useGetReposQuery } from '../../store/api/api'
import styles from './HomePage.module.scss'

const HomePage = () => {
	
	return (
		<div className={styles.hero}>
			<span className={styles.text}>Добро пожаловать</span>
		</div>
	)
}

export default HomePage
