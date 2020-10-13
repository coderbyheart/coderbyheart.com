import React from 'react'
import { SiteMetaData } from '../types'
import { MainNav } from './MainNav'
import { MetaNav } from './MetaNav'

export const Header = ({
	siteMetaData,
	className,
}: React.PropsWithChildren<{
	siteMetaData: SiteMetaData
	className?: string
}>) => (
	<header className={className}>
		<MetaNav siteMetaData={siteMetaData} />
		<MainNav />
	</header>
)
