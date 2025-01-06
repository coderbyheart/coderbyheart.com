import { Markdown } from "#component/Markdown.tsx";
import { Me } from "#component/Me.tsx";
import type { MarkdownContent } from "#content/loadMarkdownContent.ts";
import { Main } from "#layout/Main.tsx";
import { useData } from "vike-solid/useData";

import styles from "./Start.module.css";

const Page = () => {
  const { pages } = useData<{ pages: Map<string, MarkdownContent> }>();

  const start = pages.get("Start");
  if (start === undefined) throw new Error("Start not found!");
  return (
    <Main class={styles.start}>
      <Me />
      <Markdown html={start.html} />
    </Main>
  );
};

export default Page;
