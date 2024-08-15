import { Chip, CircularProgress, Rating } from '@mui/material'
import { DataGrid, GridSingleSelectColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { formatDate } from '../../services/formatDate'
import { useGetReposQuery } from '../../store/api/api'
import styles from './ResultsPage.module.scss'

// Модель данных строки
interface ISelectedRow {
	id: number
	name: string
	forks: number
	languages: { name: string }[]
	description: string
	license: string
	primaryLanguage: string
	stars: number
	updatedAt: string
}

const ResultsPage = () => {
	const { query } = useParams()
	const { data, isLoading, isFetching } = useGetReposQuery({
		query: query || '',
		first: 100,
	})
	const [selectedRow, setSelectedRow] = useState<ISelectedRow>()

	const columns: GridSingleSelectColDef[] = [
		{ field: 'name', type: 'singleSelect', headerName: 'Название', width: 180 },
		{
			field: 'primaryLanguage',
			type: 'singleSelect',
			headerName: 'Язык',
			width: 180,
		},
		{
			field: 'forks',
			type: 'singleSelect',
			headerName: 'Число форков',
			width: 180,
		},
		{
			field: 'stars',
			type: 'singleSelect',
			headerName: 'Число звезд',
			width: 180,
		},
		{
			field: 'updatedAt',
			type: 'singleSelect',
			headerName: 'Дата обновления',
			width: 180,
		},
	]

	// Генерация строк для таблицы
	const generateRows = () => {
		return (
			data &&
			data.search.edges.map((item, index) => ({
				id: index,
				name: item.node.name,
				description: item.node.description,
				forks: item.node.forks.totalCount,
				stars: item.node.stargazers.totalCount,
				primaryLanguage: item.node.primaryLanguage?.name,
				updatedAt: formatDate(item.node.updatedAt),
				license: item.node.licenseInfo?.name,
				languages: item.node.languages?.nodes,
			}))
		)
	}

	return (
		<>
			{isLoading || isFetching ? (
				<div className={styles.loader}>
					<CircularProgress size={128} />
				</div>
			) : (
				<div className={styles.wrapper}>
					<div className={styles.container}>
						<div className={styles.leftSide}>
							<div className={styles.heading}>
								<span>Результаты поиска</span>
							</div>
							<div className={styles.table}>
								{data && (
									<DataGrid
										columns={columns}
										sx={{
											border: 0,
										}}
										rows={generateRows()}
										onRowSelectionModelChange={newSelection => {
											const selectedRow = generateRows()?.find(
												row => row.id === newSelection[0]
											)
											setSelectedRow(selectedRow as ISelectedRow)
										}}
									/>
								)}
							</div>
						</div>
						{selectedRow && (
							<div className={styles.rightSide}>
								<span className={styles.heading}>{selectedRow.name}</span>
								<div className={styles.first}>
									{selectedRow.primaryLanguage && (
										<Chip
											label={selectedRow.primaryLanguage}
											size='medium'
											color='primary'
										/>
									)}
									<div className={styles.stars}>
										<Rating
											name='read-only'
											value={1}
											max={1}
											readOnly
											size='medium'
										/>
										<span>{selectedRow.stars}</span>
									</div>
								</div>
								<div className={styles.second}>
									{selectedRow.languages &&
										selectedRow.languages.map(language => (
											<Chip
												label={language.name}
												size='small'
												color='default'
											/>
										))}
								</div>
								<div className={styles.third}>{selectedRow.description}</div>
								<div className={styles.fourth}>{selectedRow.license}</div>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default ResultsPage
