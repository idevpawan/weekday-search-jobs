import SelectInput from "./components/SelectInput";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function App() {
  return (
    <div>
      <SelectInput options={options} placeholder="Minimum Base Salary" />
    </div>
  );
}

export default App;
