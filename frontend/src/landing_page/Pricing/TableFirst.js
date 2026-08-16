import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Brokerage', 'Zero Brokerage',"0.03% or Rs. 20/executed order whichever is lower", "0.03% or Rs. 20/executed order whichever is lower","Flat Rs. 20 per executed order"),
  createData('STT/CTT', '0.1% on buy & sell',"0.025% on the sell side", "0.05% on the sell side", "0.15% of the intrinsic value on options that are bought and exercised0.15% on sell side (on premium)"),
  createData('Transaction charges',"NSE: 0.00307% BSE: 0.00375%","NSE: 0.00307%BSE: 0.00375%", "NSE: 0.00183%BSE: 0", "NSE: 0.03553% (on premium)BSE: 0.0325% (on premium)"),
  createData('GST', "18% on (brokerage + SEBI charges + transaction charges)", "18% on (brokerage + SEBI charges + transaction charges)", "18% on (brokerage + SEBI charges + transaction charges)", "18% on (brokerage + SEBI charges + transaction charges)"),
  createData('SEBI charges', "₹10 / crore","₹10 / crore", "₹10 / crore", "₹10 / crore"),
 createData('Stamp charges', "0.015% or ₹1500 / crore on buy side","0.003% or ₹300 / crore on buy side", "0.002% or ₹200 / crore on buy side", "0.003% or ₹300 / crore on buy side"),
];

export default function TableFirst() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="customized table" style={{border:"20px",borderColor:"black"}}>
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="right">Equity delivery</StyledTableCell>
            <StyledTableCell align="right">Equity intraday</StyledTableCell>
            <StyledTableCell align="right">	F&O - Futures</StyledTableCell>
            <StyledTableCell align="right">F&O - Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
