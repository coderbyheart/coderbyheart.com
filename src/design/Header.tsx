import { withPrefix } from 'gatsby'
import React from 'react'
import { GatsbyLocation, SiteMetaData } from '../templates/types'
import { MainNav } from './MainNav'
import { MetaNav } from './MetaNav'

export const Header = ({
	siteMetaData,
	className,
	location,
}: React.PropsWithChildren<{
	siteMetaData: SiteMetaData
	className?: string
	location: GatsbyLocation
}>) => (
	<header className={className}>
		<MetaNav siteMetaData={siteMetaData} />
		<MainNav location={location} />
	</header>
)
