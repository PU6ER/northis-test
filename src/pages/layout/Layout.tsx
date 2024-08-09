import { Outlet } from 'react-router-dom'
import Header from '../../components/header/Header'
import styles from './Layout.module.scss'

const Layout = () => {
	return (
		<div className={styles.layout}>
			<Header />
			<Outlet />
		</div>
	)
}

export default Layout
