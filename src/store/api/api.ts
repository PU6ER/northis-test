import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GraphQLClient } from 'graphql-request'
import { gql } from 'graphql-tag'

const API_URL = 'https://api.github.com/graphql'

export const client = new GraphQLClient(API_URL)
client.setHeader(
	'Authorization',
	`Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`
)

// GraphQL запрос для поиска репозитория
const GET_REPOS_QUERY = gql`
	query getRepos($query: String!, $first: Int!) {
		search(query: $query, type: REPOSITORY, first: $first) {
			repositoryCount
			edges {
				node {
					... on Repository {
						name
						description
						primaryLanguage {
							name
						}
						licenseInfo {
							name
						}
						languages(first: 10) {
							nodes {
								name
							}
						}
						stargazers {
							totalCount
						}
						forks {
							totalCount
						}
						updatedAt
					}
				}
			}
		}
	}
`

// Ответ от сервера
export interface IResponse {
	search: {
		repositoryCount: number
		edges: { node: IRepositoryNode }[]
	}
}

// Модель репозитория из ответа сервера
export interface IRepositoryNode {
	name: string
	description: string | null
	primaryLanguage: { name: string } | null
	licenseInfo: { name: string } | null
	languages: { nodes: { name: string }[] } | null
	stargazers: { totalCount: number }
	forks: { totalCount: number }
	updatedAt: string
}

export const api = createApi({
	baseQuery: graphqlRequestBaseQuery({ client }),
	endpoints: builder => ({
		getRepos: builder.query<IResponse, { query: string; first: number }>({
			query: ({ query, first }) => ({
				document: GET_REPOS_QUERY,
				variables: { query, first },
			}),
		}),
	}),
})

export const { useGetReposQuery } = api
