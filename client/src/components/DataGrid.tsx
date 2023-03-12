import React from "react";
import {
  Box,
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridAddIcon,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { closeGrid } from "../redux/openGridSlice";
import { setRowList, clearRowList } from "../redux/rowSelection";
import Cards from "../components/Cards";
import { Delete } from "@mui/icons-material";
import { deleteManyCard } from "../scripts/cardUtils";
import { closeCardAddForm, openCardAddForm } from "../redux/openCardFormSlice";

// Styling attr. for the warning block...
const styles = {
  warning: {
    display: "none",
    border: "transparent",
    outline: "none",
    background: "red",
    color: "#fafafa",
    padding: "0.25rem 0.5rem",
    fontSize: "0.75rem",
    borderRadius: "0.25rem",
    cursor: "default",
  },
};

// Defining the data grid columns...
const columns: GridColDef[] = [
  { field: "id", headerName: "", width: 0 },
  {
    field: "cardCell",
    headerName: "Card",
    width: 450,
    maxWidth: 450,
    editable: false,
    renderCell: (params: GridRenderCellParams<any>) => {
      return <Cards key={params.id} type="card" data={params.row} />;
    },
  },
];

// Styling attr. for modal inline component (Fade)...
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
};

// Main Card Data Grid is rendered here...
export default function CardDataGrid() {
  const [auth, setAuth] = React.useState(
    JSON.parse(localStorage.getItem("auth") || "{}")
  );
  const { isGridOpen } = useSelector((state: any) => state.openGrid);
  const { isCardAddFormOpen } = useSelector((state: any) => state.cardForm);
  const { bucketId } = useSelector((state: any) => state.currentBucket);
  const { rowList } = useSelector((state: any) => state.selectedRowList);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeGrid());
  };
  const [cards, setCards] = React.useState<any>([]);
  const [cardDetails, setCardDetails] = React.useState({
    name: "",
    details: "",
    url: "",
  });
  const warning = React.useRef<HTMLSpanElement>(null);

  // Function for opening the add card form...
  const handleClickOpen = () => {
    dispatch(openCardAddForm());
  };

  // Function for closing the add card form...
  const CloseForm = () => {
    dispatch(closeCardAddForm());
  };

  // Function to get all cards in the selected bucket...
  const getCardList = () => {
    let data: any = [];
    fetch(
      `${
        import.meta.env.VITE_RENDER
      }/api/cards/getCardbyBucketId/${bucketId.trim()}`,
      {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((resMessage) => {
        data = resMessage;
        setCards(data);
      })
      .catch((err) => console.error(err.message));
  };

  // Runs getCardList whenever new bucket is selected...
  React.useEffect(() => {
    if (bucketId && bucketId.length > 0) {
      getCardList();
    }
  }, [bucketId]);

  // Function for handling input change...
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.currentTarget;
    switch (target.name) {
      case "cardName": {
        setCardDetails({
          ...cardDetails,
          name: target.value,
        });
        break;
      }
      case "cardLink": {
        setCardDetails({
          ...cardDetails,
          url: target.value,
        });
        break;
      }
      case "cardDetails": {
        setCardDetails({
          ...cardDetails,
          details: target.value,
        });
        break;
      }
      default: {
        setCardDetails({
          ...cardDetails,
        });
        break;
      }
    }
  };

  // Function for handling form submit...
  const HandleSubmit = () => {
    let data = {
      userId: auth._id.trim(),
      cardName: cardDetails.name.trim(),
      cardDetails: cardDetails.details.trim(),
      cardUrl: cardDetails.url.trim(),
      bucketName: bucketId.trim(),
    };
    let status = 200;
    fetch(`${import.meta.env.VITE_RENDER}/api/cards/createCard`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        status = response.status;
        if (status === 200) {
          setCards([...cards, data]);
          window.location.reload();
          warning.current!.style.display = "none";
          CloseForm();
          setCardDetails({
            name: "",
            details: "",
            url: "",
          });
          return response.json();
        } else if (status === 400) {
          warning.current!.style.display = "block";
        }
      })
      .catch((err) => console.error(err.message));
  };

  // Function for deleting selected cards...
  const handleDelete = () => {
    deleteManyCard(rowList);
  };

  return (
    <div>
      <Modal
        open={isGridOpen}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isGridOpen}>
          <Box sx={style}>
            {/* DataGrid Component for rendering the video cards */}
            <DataGrid
              rows={cards}
              getRowId={(row) => row._id}
              onRowSelectionModelChange={(ids: any) => {
                let selectedRowData = cards.filter((el: any) =>
                  ids.includes(el._id)
                );
                dispatch(setRowList(selectedRowData));
              }}
              rowHeight={138}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 2,
                  },
                },
              }}
              pageSizeOptions={[2]}
              checkboxSelection
              disableRowSelectionOnClick
            />
            {/* Button for adding new video card */}
            <Box display="flex" gap={5}>
              <Button
                variant="contained"
                aria-label="add-card"
                sx={{ gap: 1, backgroundColor: "#3da58a" }}
                onClick={handleClickOpen}
              >
                <GridAddIcon />
                Add Card
              </Button>
              {/* Button for deleting selected video card */}
              <Button
                variant="contained"
                aria-label="add-card"
                sx={{ gap: 1, backgroundColor: "#3da58a" }}
                onClick={handleDelete}
              >
                <Delete />
                Delete
              </Button>
            </Box>
            {/* Form for adding new video card */}
            <Dialog
              open={isCardAddFormOpen}
              onClose={() => dispatch(closeCardAddForm())}
            >
              {/* Form */}
              <DialogTitle>New Card</DialogTitle>
              <DialogContent>
                <span style={styles.warning} ref={warning}>
                  Card with this name already in use!
                </span>
                <TextField
                  autoComplete="none"
                  autoCorrect="none"
                  margin="dense"
                  id="name"
                  name="cardName"
                  label="Card Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={cardDetails.name}
                  onChange={HandleChange}
                />
                <TextField
                  autoComplete="none"
                  autoCorrect="none"
                  margin="dense"
                  id="link"
                  name="cardLink"
                  label="Video URL"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={cardDetails.url}
                  onChange={HandleChange}
                />
                <TextField
                  autoComplete="none"
                  autoCorrect="none"
                  margin="dense"
                  id="name"
                  name="cardDetails"
                  label="Card Details (optional)"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={cardDetails.details}
                  onChange={HandleChange}
                />
              </DialogContent>
              {/* Form buttons (CRUD Actions) */}
              <DialogActions>
                <Button
                  onClick={() =>
                    setCardDetails({
                      name: "",
                      details: "",
                      url: "",
                    })
                  }
                >
                  Clear
                </Button>
                <Button onClick={() => dispatch(closeCardAddForm())}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    HandleSubmit();
                  }}
                >
                  Create
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
