import React from 'react';


const rdfShapeLineItem = (row, index) => (
  <tr key={index}>
    <td>{row.node}</td>
    <td>{row.shape}</td>
    <td>{row.status}</td>
    <td>{row.reason}</td>
  </tr>
);


export default rdfShapeLineItem;
