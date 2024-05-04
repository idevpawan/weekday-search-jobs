import Select, { StylesConfig } from "react-select";

type TSelectInput = {
  options: { value: string; label: string }[];
  placeholder?: string;
  isMulti?: boolean;
  maxWidth?: number;
  onValueChange?:
    | any
    | { value: string; label: string }[]
    | { value: string; label: string };
};

function SelectInput(props: TSelectInput) {
  const { options, placeholder, isMulti, onValueChange, maxWidth } = props;

  const colourStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      fontFamily: "Lexend",
    }),
    placeholder: (styles) => ({
      ...styles,
      fontSize: "12px",
    }),
    container: (styles) => ({
      ...styles,
      width: maxWidth,
    }),
    option: (styles) => ({
      ...styles,
      fontSize: "14px",
    }),
    multiValue: (styles) => ({
      ...styles,
      fontSize: "14px",
    }),
  };

  return (
    <Select
      styles={colourStyles}
      options={options}
      placeholder={placeholder}
      isMulti={isMulti}
      isClearable
      onChange={onValueChange}
    />
  );
}

export default SelectInput;
