import type { ParentProps } from 'solid-js'

import styles from './Main.module.css'

export const Main = (props: ParentProps<{ class?: string }>) => (
	<main class={`${props.class ?? ''} ${styles.main}`}>{props.children}</main>
)
