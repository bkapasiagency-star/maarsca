import { Fragment } from "react";

/**
 * Renders a heading's words in overflow-masked spans so they can rise into
 * place. Wrap a word in *asterisks* to set it in the accent colour.
 */
export function SplitWords({ text, emphasisClass = "text-brand" }: { text: string; emphasisClass?: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((raw, i) => {
        const emphasised = raw.startsWith("*") && raw.replace(/[.,]$/, "").endsWith("*");
        const word = emphasised ? raw.replace(/\*/g, "") : raw;
        return (
          <Fragment key={i}>
            <span className="split-word inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
              <span className={`inline-block will-change-transform ${emphasised ? emphasisClass : ""}`}>{word}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </>
  );
}
