import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTable } from 'react-table'

import CSVReader from 'react-csv-reader'


function MemberInfo(props) {
 // var memberData = this.props.memberData;
  //console.log(props);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Member Name',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Email',
        accessor: 'col2',
      },
      {
        Header: 'Plan',
        accessor: 'col3',
      },
      {
        Header: 'Billing Plan',
        accessor: 'col4',
      },
      {
        Header: 'Billing Period',
        accessor: 'col5',
      },
      {
        Header: 'Status',
        accessor: 'col6',
      },
      {
        Header: 'Signup Date',
        accessor: 'col7',
      },
      {
        Header: 'Referral Code',
        accessor: 'col8',
      },
    ],
    []
  )

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({ columns, memberData })

  return (
    <div className="App">
        <h1>{props}</h1>
       {/* <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table> */}
    </div>
  );
}

export default MemberInfo;
