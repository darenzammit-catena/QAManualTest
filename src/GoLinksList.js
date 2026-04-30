import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import {Modal, Typography, Button} from "@material-ui/core"
import {styled} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import {GoLinkForm} from "./GoLinkForm"
import {useState} from "react"

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  marginBottom: "10px"
})
const Wrapper = styled("div")({
  width: "100%"
})

export function GoLinksList({setView, hasChangedView}) {
  const [open, setOpen] = useState(false)
  const data = JSON.parse(localStorage.getItem("golinks")) || []

  return (
    <Wrapper>
      <Header>
        <Typography variant="h6">Go links list</Typography>
        <Button
          variant="contained"
          disableElevation
          color="primary"
          endIcon={<AddIcon />}
          onClick={() => (hasChangedView ? null : setOpen(!open))}
        >
          Add new
        </Button>
      </Header>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Go Links Url</TableCell>
              <TableCell align="right">Track ID</TableCell>
              <TableCell align="right">Created by</TableCell>
              <TableCell align="right">Updated at</TableCell>
              <TableCell align="right">Created at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.product}
                  </TableCell>
                  <TableCell>{row.url}</TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.createdBy}</TableCell>
                  <TableCell align="right">{row.updatedAt}</TableCell>
                  <TableCell align="right">{row.createdAt}</TableCell>
                </TableRow>
              ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell align="center">No data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={() => setOpen(false)}>
        <GoLinkForm onClose={() => setOpen(false)} />
      </Modal>
    </Wrapper>
  )
}

export default GoLinksList
