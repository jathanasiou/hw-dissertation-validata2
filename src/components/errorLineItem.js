import React from 'react';


const ErrorLineItem = (error) => {
  let expectedDatatype;
  if (error.valueExpr.datatype) {
    expectedDatatype = error.valueExpr.datatype;
  } else if (error.valueExpr.reference) {
    expectedDatatype = error.valueExpr.reference;
  } else if (error.valueExpr.values) {
    expectedDatatype = error.valueExpr.values.join(', ');
  } else if (error.valueExpr.shapeExprs) {
    // TODO: needs recursion
  }

  return (
    <tr key={error.property}>
      <td>{error.type}</td>
      <td>{error.property}</td>
      <td>{error.valueExpr.type}</td>
      <td>{expectedDatatype}</td>
    </tr>
  );
};


export default ErrorLineItem;
