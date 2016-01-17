/*eslint-disable func-style*/
export default function stringifySymbol( symbol ) {
  var symStr = symbol.toString();
  return symStr.slice( 7, symStr.length - 1 );
}
