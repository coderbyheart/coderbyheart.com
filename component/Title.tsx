import { format } from 'date-fns'

export const Title = ({
	title,
	subtitle,
	date,
	noheadline,
}: {
	title?: string | null
	subtitle?: string | null
	date?: string | null
	noheadline?: boolean
}) => {
	if (title === null && (subtitle === null || subtitle === undefined))
		return null
	return (
		<header class={'title'}>
			{(noheadline ?? false) ? (
				subtitle !== null && subtitle !== undefined && <h1>{subtitle}</h1>
			) : (
				<>
					{subtitle !== null && subtitle !== undefined && <div>{subtitle}</div>}
					{title !== null && title !== undefined && <h1>{title}</h1>}
				</>
			)}
			{date !== null && date !== undefined && (
				<time dateTime={date}>{format(new Date(date), 'd. MMMM yyyy')}</time>
			)}
		</header>
	)
}
