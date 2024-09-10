import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Autocomplete from "@mui/joy/Autocomplete";
import CircularProgress from "@mui/joy/CircularProgress";

const API_KEY = "a9f21eab275bad66a23aadba66f3b626"; // Replace with your actual API key

export default function OrderForm({changeSymbol}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      if (inputValue === "") {
        setOptions([]);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${inputValue}&limit=10&apikey=${API_KEY}`);
        const data = await response.json();
        if (active) setOptions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    })();
    return () => { active = false; };
  }, [loading, inputValue]);

  React.useEffect(() => {
    if (!open) {
      try {
        changeSymbol(inputValue.match(/^[A-Z]+/)[0]);
      } catch (symbolError) {
        console.log(symbolError);
      }
      setOptions([]);
    }
  }, [open]);

  return (
    <FormControl id="stock-search">
      <FormLabel>Stock Search</FormLabel>
      <Autocomplete
        placeholder="Enter ticker or company name"
        sx={{ width: 300 }}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        isOptionEqualToValue={(option, value) => option.symbol === value.symbol}
        getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
        options={options}
        loading={loading}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          setLoading(true);
        }}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input type="text" {...params.inputProps} placeholder="Search for a stock" />
          </div>
        )}
        endDecorator={ loading ? ( <CircularProgress size="sm" sx={{ bgcolor: "background.surface" }}/> ) : null }
      />
    </FormControl>
  );
}
