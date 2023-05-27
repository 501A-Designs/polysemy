import React, { useRef, useState } from "react";
import Block from "./Block";
import Caret from "@/components/Caret";
import { StackType } from "@/app/(editor)/Editor";
import { IntentComponentProps } from "../../Row";

const Text: React.FC<IntentComponentProps> = ({
  rowIndex,
  stack,
  setStack,
}) => {
  const [highlightPoint, setHighlightPoint] = useState([]);

  const currentRow: StackType = stack[rowIndex];
  const data = currentRow.data.text;

  const inputRef = useRef<HTMLInputElement>(null);

  const focusOnInputRef = () => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((word: string, i: number) => (
          <Block
            key={i}
            blockIndex={i}
            rowIndex={rowIndex}
            highlightPoint={highlightPoint}
            setHighlightPoint={setHighlightPoint}
            stack={stack}
            setStack={setStack}
            word={word}
            focusOnInputRef={focusOnInputRef}
          />
        ))}
      <Caret
        focusOnInputRef={focusOnInputRef}
        inputRef={inputRef}
        rowIndex={rowIndex}
        stack={stack}
        setStack={setStack}
      />
      {data.length > 0 && (
        <span
          className={`
            font-mono text-xs text-orange-600 ml-auto mr-3
            whitespace-nowrap print:hidden
          `}
        >
          {data.length} Words
        </span>
      )}
    </>
  );
};

export default Text;