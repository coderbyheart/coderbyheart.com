import { format } from 'date-fns'

export const Title = ({
	title,
	subtitle,
	date,
}: {
	title?: string | null
	subtitle?: string | null
	date?: string | null
}) => {
	if (title === null) return null
	return (
		<header class={'title'}>
			{subtitle !== null && subtitle !== undefined && <div>{subtitle}</div>}
			<h1>{title}</h1>
			{date !== null && date !== undefined && (
				<time dateTime={date}>{format(new Date(date), 'd. MMMM yyyy')}</time>
			)}
		</header>
	)
}
