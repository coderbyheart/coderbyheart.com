import { name } from '#pages/info.ts'
import { avatarUrl } from './avatarUrl.ts'

import styles from './Me.module.css'

export const Me = () => (
	<img
		src={avatarUrl()}
		width={150}
		height={150}
		alt={name}
		class={styles.me}
	/>
)
