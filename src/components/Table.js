import React from "react";
import "../styles/style.css";

const Table = (props) => {
  const { name, headers, rows } = props;

  return (
    <div>
      <TableName name={name} />
      <table>
        <TableHeader headers={headers} />
        <TableBody headers={headers} rows={rows} />
      </table>
    </div>
  );
};

const TableName = (props) => {
  const { name } = props;
  return <div>{name}</div>;
};

const TableHeader = (props) => {
  const { headers } = props;
  return (
    <thead>
      <tr>
        {headers.map((value, index) => {
          return (
            <th key={index}>
              <div>{value}</div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  const { headers, rows } = props;

  function buildRow(row, headers) {
    return (
      <tr>
        {headers.map((header, index) => {
          return <td key={index}>{row[header]}</td>;
        })}
      </tr>
    );
  }

  return (
    <tbody>
      {rows.map((row) => {
        return buildRow(row, headers);
      })}
    </tbody>
  );
};

export default Table;
