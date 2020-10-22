import { createGlobalStyle } from 'styled-components'
import { fonts, breakpoints } from '../design/settings'

export const GlobalStyle = createGlobalStyle`
	:root {
		--text-font-family: ${fonts.text.name}, sans-serif;
		--text-font-weigth: ${fonts.text.weights.regular};
		--text-font-weigth-bold: ${fonts.text.weights.bold};
		--headline-font-family: ${fonts.headline.name}, sans-serif;
		--headline-font-weight: ${fonts.headline.weights.regular};
		--headline-font-weight-light: ${fonts.headline.weights.light};
		--headline-font-weight-thin: ${fonts.headline.weights.thin};
		--background-color: #ffffff;
		--background-color-dark: #191919;
		--highlight-color: #007da7;
		--highlight-color-on-dark: #00b4ef;
		--note-bg-color: #e7f9ff;
		--text-color: #3f3f3f;
		--text-color-light: #ffffffd9;
		--heart-color: #e00073;
		--heart-color-on-note: #d8006f;
		--small-font-size: 12px;
		--max-width: ${breakpoints.content};
		--color-syntax-ChelseaGem:	#aa5d00;
		--color-syntax-DeepCerulean:	#007faa;
		--color-syntax-DoveGray:	#696969;
		--color-syntax-Emperor:	#545454;
		--color-syntax-JapaneseLaurel:	#008000;
		--color-syntax-Thunderbird:	#d91e18;
	}
	html,
	body {
		font-family: var(--text-font-family);
		font-weight: var(--text-font-weigth);
		height: 100%;
		background-color: var(--background-color);
		color: var(--text-color);
		h1, h2, h3, h4, h5, h6 {
			font-family: var(--headline-font-family);
			font-weight: var(--headline-font-weight);
			line-height: 115%;
		}
	}
	#___gatsby, #gatsby-focus-wrapper {
		height: 100%;
	}
	body {
		overflow-x: hidden;
	}
`
