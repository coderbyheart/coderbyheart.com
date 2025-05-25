export const typeToExtension = (type: string): string => {
	switch (type) {
		case 'JPG':
		case 'JPEG':
			return 'jpg'
		case 'PNG':
			return 'png'
		case 'GIF':
			return 'gif'
		default:
			throw new Error(`Unsupported image type: ${type}!`)
	}
}

export const contentTypeToType = (contentType: string): string => {
	switch (contentType) {
		case 'image/jpeg':
			return 'JPG'
		case 'image/png':
			return 'PNG'
		case 'image/gif':
			return 'GIF'
		default:
			throw new Error(`Unsupported content type: ${contentType}!`)
	}
}
