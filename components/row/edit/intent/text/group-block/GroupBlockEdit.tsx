import React, { useRef, useState } from "react";
import { GroupBlockDictType } from "@/util/data/groupBlockDict";
import { BlockModeTypes, checkBlockIntent } from "@/util/helper/blockUtilities";
import Block from "../block/Block";
import GroupBlockWrapper from "./GroupBlockWrapper";
import {
  createGroupBlockModeAtIndex,
  groupApplyLink,
  groupBackspace,
  groupBackspaceMultiple,
  groupEdit,
  groupInsert,
  updateGroupBlockModeAtIndex,
} from "@/util/helper/groupBlockUtilities";
import {
  isEndOfHighlight,
  selectBlockIndex,
  sentence,
} from "@/util/helper/globalUtilities";
import TextAction from "@/components/ui/highlight/text-layer/TextAction";
import LinkBlock from "../link-block/LinkBlock";

interface GroupBlockEditProps {
  updateBlockMode: (mode: BlockModeTypes) => void;
  editGroupBlock: (text: string) => void;
  groupBlockText: string;
  groupBlockIntent: GroupBlockDictType | undefined;
}

const GroupBlockEdit: React.FC<GroupBlockEditProps> = ({
  updateBlockMode,
  editGroupBlock,
  groupBlockText,
  groupBlockIntent,
  ...props
}) => {
  const caretRef = useRef<HTMLInputElement>(null);
  const focusOnCaret = () => {
    if (caretRef.current != null) {
      caretRef.current.focus();
    }
  };

  const [input, setInput] = useState<string>("");
  const [groupBlock, setGroupBlock] = useState<string[]>(
    groupBlockText ? groupBlockText.slice(1, -1).split(" ") : []
  );

  const [selectBlocks, setSelectBlocks] = useState<number[]>([]);

  const editAndSave = () => {
    editGroupBlock(
      `${groupBlockIntent?.start}${groupBlock.join(" ")}${
        groupBlockIntent?.end
      }`
    );
    updateBlockMode("standard");
  };

  const groupBlockModeOriginal = new Array(groupBlock.length).fill("standard");
  const [groupBlockMode, setGroupBlockMode] = useState(groupBlockModeOriginal);

  console.log(groupBlock);

  return (
    <GroupBlockWrapper groupBlockIntent={groupBlockIntent}>
      <>
        {groupBlock.length > 0 &&
          groupBlock.map((word: string, i: number) => (
            <>
              {checkBlockIntent(word) === "standard" && (
                <Block
                  key={i}
                  blockIndex={i}
                  selected={selectBlocks}
                  selectBlock={() =>
                    selectBlockIndex(i, selectBlocks, setSelectBlocks)
                  }
                  word={word}
                  focusOnCaret={() => focusOnCaret()}
                  backspace={() => groupBackspace(i, groupBlock, setGroupBlock)}
                  insert={(input: string) =>
                    groupInsert(input, i, groupBlock, setGroupBlock)
                  }
                  edit={(input: string) =>
                    groupEdit(input, i, groupBlock, setGroupBlock)
                  }
                  blockMode={groupBlockMode[i]}
                  createBlockMode={() =>
                    createGroupBlockModeAtIndex(
                      i,
                      groupBlockMode,
                      setGroupBlockMode
                    )
                  }
                  updateBlockMode={(mode: BlockModeTypes) =>
                    updateGroupBlockModeAtIndex(
                      i,
                      mode,
                      groupBlockMode,
                      setGroupBlockMode
                    )
                  }
                />
              )}
              {checkBlockIntent(word) === "link" && (
                <LinkBlock
                  key={i}
                  blockIndex={i}
                  selected={selectBlocks}
                  selectBlock={() =>
                    selectBlockIndex(i, selectBlocks, setSelectBlocks)
                  }
                  word={word}
                  focusOnCaret={() => focusOnCaret()}
                  backspace={() => groupBackspace(i, groupBlock, setGroupBlock)}
                  insert={(input: string) =>
                    groupInsert(input, i, groupBlock, setGroupBlock)
                  }
                  edit={(input: string) =>
                    groupEdit(input, i, groupBlock, setGroupBlock)
                  }
                  blockMode={groupBlockMode[i]}
                  createBlockMode={() =>
                    createGroupBlockModeAtIndex(
                      i,
                      groupBlockMode,
                      setGroupBlockMode
                    )
                  }
                  updateBlockMode={(mode: BlockModeTypes) =>
                    updateGroupBlockModeAtIndex(
                      i,
                      mode,
                      groupBlockMode,
                      setGroupBlockMode
                    )
                  }
                />
              )}
              {isEndOfHighlight(selectBlocks, i) && (
                <TextAction
                  sentence={() => sentence(selectBlocks, groupBlock)}
                  resetSelect={() => {
                    focusOnCaret();
                    setSelectBlocks([]);
                  }}
                  backspaceMultiple={() =>
                    groupBackspaceMultiple(
                      selectBlocks,
                      groupBlock,
                      setGroupBlock
                    )
                  }
                  applyLink={(link: string) =>
                    groupApplyLink(
                      link,
                      selectBlocks,
                      groupBlock,
                      setGroupBlock
                    )
                  }
                />
              )}
            </>
          ))}
        {!selectBlocks.length && (
          <>
            <input
              autoFocus
              placeholder="Type..."
              value={input}
              ref={caretRef}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                switch (e.key) {
                  case " ":
                    groupInsert(
                      input,
                      groupBlockMode.length,
                      groupBlock,
                      setGroupBlock
                    );
                    createGroupBlockModeAtIndex(
                      groupBlockMode.length,
                      groupBlockMode,
                      setGroupBlockMode
                    );
                    setTimeout(() => setInput(""), 1);
                    break;
                  case "Enter":
                    editAndSave();
                    break;
                }
              }}
            />
            <button
              className={`btn btn-standard`}
              onClick={() => editAndSave()}
            >
              Done
            </button>
          </>
        )}

        {/* {selectBlocks.length > 1 && (
          <FunctionBar>
            <button
              autoFocus
              className={`btn btn-selectop`}
              onClick={() => setSelectBlocks([])}
            >
              Test
            </button>
          </FunctionBar>
        )} */}
      </>
    </GroupBlockWrapper>
  );
};

export default GroupBlockEdit;
