import { name } from '#pages/info.ts'
import { avatarUrl } from './avatarUrl.ts'

export const Me = () => (
	<img src={avatarUrl()} width={150} height={150} alt={name} class={'me'} />
)
