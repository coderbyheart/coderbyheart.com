import Bottleneck from 'bottleneck'
import { createClient, type Entry } from 'contentful'

const limiter = new Bottleneck({
	minTime: 1000 / 5,
	maxConcurrent: 5,
})

const cf = createClient({
	space: process.env.CONTENTFUL_SPACE!,
	accessToken: process.env.CONTENTFUL_CONTENT_API_TOKEN!,
})

export const getMediaEntry = async (id: string): Promise<string | null> => {
	const { items } = await limiter.schedule(async () =>
		cf.getEntries({
			content_type: 'image',
			'fields.id': id,
		}),
	)
	if (items.length === 0) throw new Error(`Media entry for ${id} not found.`)
	const media = items[0]
	const asset = await limiter.schedule(async () =>
		cf.getAsset((media.fields.media as Entry).sys.id),
	)
	return asset.fields.file?.url ?? null
}
