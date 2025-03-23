import { format } from 'date-fns'
import styles from './Title.module.css'

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
		<header class={styles.title}>
			{subtitle !== null && subtitle !== undefined && (
				<div class={styles.subtitle}>{subtitle}</div>
			)}
			<h1>{title}</h1>
			{date !== null && date !== undefined && (
				<time class={styles.time} dateTime={date}>
					{format(new Date(date), 'd. MMMM yyyy')}
				</time>
			)}
		</header>
	)
}
