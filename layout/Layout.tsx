import { MetaNav } from "#component/MetaNav.tsx";
import type { ParentProps } from "solid-js";
import { Footer } from "#component/Footer.tsx";
import { MainNav } from "#component/MainNav.tsx";

import "./Layout.css";

export const Layout = (props: ParentProps) => (
  <>
    <MetaNav />
    <MainNav />
    {props.children}
    <Footer />
  </>
);
