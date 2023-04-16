import { Button } from "./Button";

export interface SuggestProps{
  inputRef?:any
  input:string | '',
  setInput:any,
  setFocus?:any,
  suggestion:string[],
  children:JSX.Element | JSX.Element[],
  onFocus?:any,
}

export default function Suggest(props:SuggestProps) {
  return (
    <>
      {props.children}
      {props.input?.length > 3 && 
        <>
          {props.suggestion.map(suggestedText =>
            <Button 
              key={suggestedText}
              onClick={() => {
                props.setInput(suggestedText);
                props?.setFocus(true);
                if (props?.inputRef.current != null) {
                  props?.inputRef.current.focus();
                }
              }}
            >
              {suggestedText}
            </Button>
          )}
        </>
      }
    </>
  )
}
