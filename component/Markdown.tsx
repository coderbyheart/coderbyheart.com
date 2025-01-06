import styles from './Markdown.module.css'

export const Markdown = (props: { html: string }) => (
	<div class={styles.content} innerHTML={props.html} />
)
