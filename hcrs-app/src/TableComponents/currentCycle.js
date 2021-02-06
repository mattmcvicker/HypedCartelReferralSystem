import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { firebase } from "../firebase/config";
import { Button } from '@material-ui/core';
import "../styles/mainstyles.css"

const newcolumns = [
  // { field: 'user', headerName: 'User', width: 130 },
  { field: 'email', headerName: 'Email', width: 275 },
  { field: 'code', headerName: 'Referral Code', width: 160 },
  { field: 'count', headerName: 'Count', width: 130 }
];


export default function CurrentCycleTable(props) {
  const [tableRows, setTableRows] = React.useState([]);
  const [currentCycleDate, setCurrentCycleDate] = React.useState([]);
  const [tempRows, setTempRows] = React.useState([]);

  React.useEffect(() => {
    let data_;
    let temp = [];
    let count = 1;
    const currentCycleData = firebase.database().ref("cycle");
    currentCycleData.on("value", (snapshot) => {
      var keyValues = Object.keys(snapshot.val());
      setCurrentCycleDate(keyValues[keyValues.length - 1]);
      data_ = snapshot.val()[keyValues[keyValues.length - 1]]
      data_.dataSubmitted.forEach((value) => {
        temp.push({
          id: count, email: value.email, code: value.code
        })
        count++;
      })
      setTempRows(temp);
    })
  }, [])

  const loadData = () => {
    var final = [];
    for (var i = 0; i < tempRows.length; i++) {
      var counter = 0;
      for (var j = 0; j < props.allMemberData.length; j++) {
        if (props.allMemberData[j].referralcode === tempRows[i].code) {
          console.log("Winner")
          counter++;
        }
        if (props.allMemberData[j].status !== "Active") {
          console.log(props.allMemberData[j].status)
        }
      }
      final.push({
        id: i + 1,
        // user: tempRows[i].user,
        email: tempRows[i].email,
        code: tempRows[i].code,
        count: counter
      })
    }
    setTableRows(final);
  }

  return (
    <div>
      <h3 style={{ color: "white", fontStyle: "italic", paddingBottom: "10px" }}>Current Referral Cycle: {currentCycleDate}</h3>
      <div style={{ height: 400, width: '40%', paddingBottom: "20px" }}>
        <DataGrid rows={tableRows} columns={newcolumns} pageSize={5} />
      </div>
      <Button variant="contained" color="secondary" onClick={loadData} style={{marginTop: "20px"}}>Load Current Cycle Data</Button>
    </div>
  );
}
