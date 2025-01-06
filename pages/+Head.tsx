import favicon from "./favicon.ico";

export const Head = () => (
  <>
    <link rel="icon" href={favicon} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="node_modules/the-new-css-reset/css/reset.css"
    />
  </>
);
