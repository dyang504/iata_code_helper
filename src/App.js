import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import match_codes from "./utils";

function App() {
  let [prefix, setPrefix] = useState("");
  let [prefixes, setPrefixes] = useState([]);
  let [symbol, setSymbol] = useState("");
  let [suffix, setSuffix] = useState("");
  let [suffixs, setSuffixs] = useState([]);

  const [result, setResult] = useState("");

  const onNewCodeChange = useCallback((event) => {
    setPrefix(event.target.value);
  }, []);

  const addNewPrefix = useCallback(() => {
    setPrefixes([...prefixes, prefix.toUpperCase()]);
    setPrefix("");
  }, [prefix, prefixes]);

  const onNewSuffixChange = useCallback((event) => {
    setSuffix(event.target.value);
  }, []);

  const addNewSuffix = useCallback(() => {
    setSuffixs([...suffixs, suffix.toUpperCase()]);
    setSuffix("");
  }, [suffix, suffixs]);

  const compute = useCallback(
    (iataCodes, symbol, suffixs) => (event) => {
      const result_string = JSON.stringify(
        match_codes(iataCodes, symbol, suffixs)
      );
      setResult(result_string);
    },
    []
  );

  const genPrefixs = useCallback((iataCodes) => (event) => {
    const r = iataCodes.join(";");
    const result_string = JSON.stringify(r);
    setResult(result_string);
  });

  useEffect(() => {
    console.log(prefix);
  }, [prefix]);

  useEffect(() => {
    console.log(prefixes);
  }, [prefixes]);

  useEffect(() => {
    console.log(suffixs);
  }, [suffixs]);

  return (
    <div className="App">
      <div className="container">
        <h1>Work Cat</h1>
        <h2>IATA Code Match Tool</h2>
        <p>It's a little tool used for combine iata code and some suffixes.</p>
        <div className="center_container">
          <div className="container">
            <label>Prefix</label>
            <div>
              <input
                type="text"
                onChange={onNewCodeChange}
                value={prefix}
              ></input>
              <input
                className="add_button"
                type="button"
                value="add"
                onClick={addNewPrefix}
              ></input>
            </div>
            <label>Symbol</label>
            <div>
              <input
                type="text"
                onChange={(e) => {
                  setSymbol(e.target.value);
                }}
                value={symbol}
              ></input>
            </div>

            <label>Suffix</label>
            <div>
              <input
                type="text"
                onChange={onNewSuffixChange}
                value={suffix}
              ></input>
              <input
                type="button"
                onClick={addNewSuffix}
                value="add"
                className="add_button"
              ></input>
            </div>
            <input
              type="button"
              value="Generate Prefix list"
              onClick={genPrefixs(prefixes)}
            ></input>
            <input
              type="button"
              value="Match Prefixs and Suffixs"
              onClick={compute(prefixes, symbol, suffixs)}
            ></input>
          </div>
        </div>
        <p>Prefixs {prefixes}</p>
        <p>Suffix {suffixs}</p>
        <h3>Result</h3>
        <p className="result_card"> {result} </p>
      </div>
    </div>
  );
}

export default App;
