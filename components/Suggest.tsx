export interface SuggestProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  input: string | "";
  setInput: any;
  suggestion: string[];
  focusOnClick: any;
}

const Suggest: React.FC<SuggestProps> = ({
  input,
  setInput,
  suggestion,
  focusOnClick,
  ...props
}) => {
  return (
    <>
      {props.children}
      {input?.length > 2 && (
        <>
          {suggestion.map((s: string) => (
            <button
              className={`btn btn-word`}
              key={s}
              onClick={() => {
                setInput(s);
                focusOnClick();
              }}
              {...props}
            >
              {s}
            </button>
          ))}
        </>
      )}
    </>
  );
};
export default Suggest;
