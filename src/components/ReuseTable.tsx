import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Avatar,
} from "@mui/material";
import PaginationTable from "./PaginationTable";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

interface TableColumn {
  label: string;
  field: string;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
}

const ReuseTable: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field} sx={{ padding: "8px" }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.field} sx={{ padding: "8px" }}>
                    {column.field === "isBlocked" ? (
                      row.isBlocked ? (
                        <BlockIcon sx={{ color: "#FF3B30" }} />
                      ) : (
                        <CheckCircleIcon sx={{ color: "#4CAF50" }} />
                      )
                    ) : column.field === "verified" ? (
                      row.verified ? (
                        <VerifiedUserIcon sx={{ color: "#00C853" }} />
                      ) : (
                        <NewReleasesIcon sx={{ color: "#F44336" }} />
                      )
                    ) : column.field === "profilePic" ? (
                      row.profilePic ? (
                        <Avatar src={row.profilePic} alt="Profile" />
                      ) : (
                        <Avatar
                          sx={{ color: "#616161 ", backgroundColor: "#61512" }}
                        />
                      )
                    ) : column.field === "isApproved" ? (
                      row.isApproved ? (
                        <CheckCircleIcon sx={{ color: "#4CAF50" }} />
                      ) : (
                        <CancelIcon sx={{ color: "#D32F2F" }} />
                      )
                    ) : column.field === "isRegistered" ? (
                      row.isRegistered ? (
                        <HowToRegIcon sx={{ color: "#8BC34A" }} />
                      ) : (
                        <HighlightOffIcon sx={{ color: "#D32F2F" }} />
                      )
                    ) : column.field === "isNew" ? (
                      row.isNew ? (
                        <NewReleasesIcon sx={{ color: "#FF9800" }} />
                      ) : null
                    ) : (
                      (row[column.field] ?? "N/A")
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationTable />
    </>
  );
};

export default ReuseTable;
