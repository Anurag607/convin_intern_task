import React from "react";
import Header from "../../components/Header";
import Cards from "../../components/Cards";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Fab,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import UpdateForm from "../../components/Form";
import UpdateCardForm from "../../components/CardForm";
import CardDataGrid from "../../components/DataGrid";
import IFrame from "../../components/Iframe";

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

// Main dashboard component is rendered here...
const Dashboard = () => {
  const [auth, setAuth] = React.useState(
    JSON.parse(localStorage.getItem("auth") || "{}")
  );
  const [buckets, setBuckets] = React.useState<any>([]);
  const [bucketDetails, setBucketDetails] = React.useState({
    name: "",
    details: "",
  });
  const [open, setOpen] = React.useState(false);
  const warning = React.useRef<HTMLSpanElement>(null);

  // Function for opening the add bucket form...
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Function for closing the add bucket form...
  const handleClose = () => {
    setOpen(false);
  };

  // Function to get all the user's buckets...
  const getBucketList = () => {
    let data: any = [];
    fetch(
      `${import.meta.env.VITE_RENDER}/api/buckets/getUsersBuckets/${auth._id}`,
      {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((resMessage) => {
        data = resMessage;
        setBuckets(data);
      })
      .catch((err) => console.error(err.message));
  };

  // Function for running getBucketList whenever the dashboard re-renders...
  React.useEffect(() => {
    getBucketList();
  }, []);

  // Function for handling input change...
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.currentTarget;
    switch (target.name) {
      case "bucketName": {
        setBucketDetails({
          ...bucketDetails,
          name: target.value,
        });
        break;
      }
      case "bucketDetails": {
        setBucketDetails({
          ...bucketDetails,
          details: target.value,
        });
        break;
      }
      default: {
        setBucketDetails({
          ...bucketDetails,
        });
        break;
      }
    }
  };

  // Function for handling form submit...
  const HandleSubmit = () => {
    let data = {
      userId: auth._id.trim(),
      bucketName: bucketDetails.name.trim(),
      bucketDetails: bucketDetails.details.trim(),
    };
    let status = 200;
    fetch(`${import.meta.env.VITE_RENDER}/api/buckets/createBucket`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        status = response.status;
        if (status === 200) {
          setBuckets([...buckets, data]);
          window.location.reload();
          warning.current!.style.display = "none";
          handleClose();
          setBucketDetails({
            name: "",
            details: "",
          });
          return response.json();
        } else if (status === 400) {
          warning.current!.style.display = "block";
        }
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        width="100%"
        height="10%"
      >
        <Header
          title="DASHBOARD"
          subTitle={`Welcome ${auth.username || ""}!`}
        />
        {/* Bucket List is rendered here */}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexWrap="wrap"
          gap={2.75}
          width="100%"
          height="90%"
        >
          {buckets.map((el: any, i: number) => {
            return <Cards key={i} type="bucket" data={el} />;
          })}
        </Box>
      </Box>
      {/* FAB button for adding new bucket */}
      <Fab
        color="secondary"
        aria-label="add-bucket"
        onClick={handleClickOpen}
        sx={{ position: "absolute", bottom: "7.5%", right: "5%" }}
      >
        <AddIcon sx={{ color: "#ffffff" }} />
      </Fab>
      {/* Form for adding new bucket */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Bucket</DialogTitle>
        {/* Form */}
        <DialogContent>
          <span style={styles.warning} ref={warning}>
            Bucket with this name already in use!
          </span>
          <TextField
            autoComplete="none"
            autoCorrect="none"
            margin="dense"
            id="name"
            name="bucketName"
            label="Bucket Name"
            type="text"
            fullWidth
            variant="standard"
            value={bucketDetails.name}
            onChange={HandleChange}
          />
          <TextField
            autoComplete="none"
            autoCorrect="none"
            margin="dense"
            id="name"
            name="bucketDetails"
            label="Bucket Details (optional)"
            type="text"
            fullWidth
            variant="standard"
            value={bucketDetails.details}
            onChange={HandleChange}
          />
        </DialogContent>
        {/* Form buttons (CRUD Actions) */}
        <DialogActions>
          <Button
            onClick={() =>
              setBucketDetails({
                name: "",
                details: "",
              })
            }
          >
            Clear
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              HandleSubmit();
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      {/* Bucket Form Component */}
      <UpdateForm />
      {/* Card Datagrid Component */}
      <CardDataGrid />
      {/* Card Form Component */}
      <UpdateCardForm />
      {/* Video IFram Component */}
      <IFrame />
    </Box>
  );
};

export default Dashboard;
