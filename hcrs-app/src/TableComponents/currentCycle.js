import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { firebase } from "../firebase/config";
import { Button } from '@material-ui/core';


const newcolumns = [
    { field: 'user', headerName: 'Username', width: 130 },
    { field: 'code', headerName: 'Referral Code', width: 160 },
  ];


export default function DataGridDemo() {
  const [tableRows, setTableRows] = React.useState([]);
  const [currentCycleDate, setCurrentCycleDate] = React.useState([]);
  React.useEffect(() => {
    let data_;
    let tempRows = [];
    let count = 1;
    const currentCycleData = firebase.database().ref("cycle");
    currentCycleData.on("value", (snapshot) => {
        var keyValues = Object.keys(snapshot.val());
        setCurrentCycleDate(keyValues[keyValues.length - 1]);
        data_ = snapshot.val()[keyValues[0]]
        data_.dataSubmitted.forEach((value) => {
            tempRows.push({
                id: count, user: value.user, code: value.code
            })
            count++;
        })
        setTableRows(tempRows);
    })
    
  }, [])

  
  return (
    <div>
      <h3>{currentCycleDate}</h3>
      <div style={{ height: 400, width: '20%' }}>
        <DataGrid rows={tableRows} columns={newcolumns} pageSize={5}  />
      </div>
    </div>
  );
}
