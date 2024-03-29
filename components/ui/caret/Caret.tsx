import React, { useState } from "react";
import { GroupBlockDictType } from "@/util/data/groupBlockDict";
import {
  formatContent,
  getGroupBlockIntentData,
} from "@/util/helper/blockUtilities";
import PrimitiveCaret from "./PrimitiveCaret";
import { BlockType } from "@/components/row/edit/intent/text/TextInterpreter";
import GroupBlockInsert from "@/components/row/edit/intent/text/group-block/GroupBlockInsert";

interface CaretProps {
  inputRef: React.Ref<HTMLInputElement>;
  focusOnCaret: () => void;
  insert: (inputBlockObj: BlockType) => void;
}

const Caret: React.FC<CaretProps> = ({ inputRef, focusOnCaret, insert }) => {
  const [blockIntent, setBlockIntent] = useState<BlockType["type"]>();
  const [groupBlockIntent, setGroupBlockIntent] =
    useState<GroupBlockDictType>();

  return (
    <>
      {blockIntent === "group" ? (
        <GroupBlockInsert
          blocksData={[]}
          groupBlockIntent={groupBlockIntent}
          enter={(blocksData: BlockType[]) =>
            insert({
              type: "group",
              content: formatContent.groupBlock(groupBlockIntent, blocksData),
            })
          }
        />
      ) : (
        <PrimitiveCaret
          inputRef={inputRef}
          focusOnCaret={focusOnCaret}
          insert={insert}
          setBlockIntent={setBlockIntent}
          setGroupBlockIntent={(symbol: string) =>
            setGroupBlockIntent(getGroupBlockIntentData(symbol))
          }
        />
      )}
    </>
  );
};

export default Caret;
