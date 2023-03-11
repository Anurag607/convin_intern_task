import React from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { updateBucket } from "../scripts/bucketUtils";
import { useSelector, useDispatch } from "react-redux";
import { closeForm } from "../redux/openFormSlice";
import { setCurrentBucketData } from "../redux/currentData";

const placeholder = {
  name: "",
  details: "",
};

const UpdateForm = (props: any) => {
  const dispatch = useDispatch();
  const [auth, setAuth] = React.useState(
    JSON.parse(localStorage.getItem("auth") || "{}")
  );
  const { bucketData } = useSelector((state: any) => state.currentData);
  const { isOpen } = useSelector((state: any) => state.openForm);

  const handleClose = () => {
    dispatch(closeForm());
  };

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.currentTarget;
    switch (target.name) {
      case "bucketName": {
        dispatch(
          setCurrentBucketData({
            ...bucketData,
            bucketName: target.value,
          })
        );
        break;
      }
      case "bucketDetails": {
        dispatch(
          setCurrentBucketData({
            ...bucketData,
            bucketDetails: target.value,
          })
        );
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <Box m="20px">
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Update Bucket</DialogTitle>
        <DialogContent>
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
            value={bucketData.bucketName}
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
            value={bucketData.bucketDetails}
            onChange={HandleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(setCurrentBucketData(placeholder))}>
            Clear
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
              const data = {
                bucketName: bucketData.bucketName.trim(),
                bucketDetails: bucketData.bucketDetails.trim(),
                userId: auth._id.trim() as string,
              };
              updateBucket(bucketData._id, data);
              dispatch(setCurrentBucketData(placeholder));
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpdateForm;
