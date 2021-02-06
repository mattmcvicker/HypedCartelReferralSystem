import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'plan', headerName: 'Plan', width: 130 },
  { field: 'status', headerName: 'Status', width: 130},
  { field: 'referralcode', headerName: 'Referral Code', width: 150 },
  { field: 'signup', headerName: 'Sign-up Date', width: 150 },
];


export default function AllMemberTable(props) {
  const [tableRows, setTableRows] = React.useState([]);
  const data = props.data;
  React.useEffect(() => {
    console.log("!!!!!!!!!!")
    console.log(props)
    console.log(data)
    console.log("!!!!!!!!!!")

    let tempRows = [];
    let count = 1;
    props.data.forEach((value) => {
      tempRows.push({
        id: count,
        name: value.name, email: value.email, plan: value.plan,
        referralcode: value.referralcode, signup: value.signupdate,
        status: value.status
      })
      count++;
    })
    setTableRows(tempRows)
  }, [props, data])

  console.log(tableRows)
  return (
    <div style={{ height: 600, width: '70%' }}>
      <DataGrid rows={tableRows} columns={columns} pageSize={10} />
    </div>
  );
}
