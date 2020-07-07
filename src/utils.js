function match_codes(iata_code_prefix, symbol, iata_code_suffix) {
  let result = iata_code_suffix.map((suffix) => {
    let combine_array = iata_code_prefix.map(
      (prefix) => prefix + symbol + suffix
    );
    let item = new Object();
    item[suffix] = combine_array.join(";");
    return item;
  });
  return result;
}

// match_codes(["CAN", "PVG"], "-", ["ALL", "DOM"]);

export default match_codes;
