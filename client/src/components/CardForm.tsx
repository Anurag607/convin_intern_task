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
import { updateCard } from "../scripts/cardUtils";
import { useSelector, useDispatch } from "react-redux";
import { closeCardForm } from "../redux/openCardFormSlice";
import { setCurrentCardData } from "../redux/currentData";

const placeholder = {
  cardName: ``,
  cardDetails: ``,
  cardUrl: ``,
  bucketName: ``,
};

const UpdateCardForm = () => {
  const dispatch = useDispatch();
  const [auth, setAuth] = React.useState(
    JSON.parse(localStorage.getItem("auth") || "{}")
  );
  const { cardData } = useSelector((state: any) => state.currentData);
  const { isCardFormOpen } = useSelector((state: any) => state.cardForm);

  const handleClose = () => {
    dispatch(closeCardForm());
  };

  // Function for handling input change
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.currentTarget;
    switch (target.name) {
      case "cardName": {
        dispatch(
          setCurrentCardData({
            ...cardData,
            cardName: target.value,
          })
        );
        break;
      }
      case "cardLink": {
        dispatch(
          setCurrentCardData({
            ...cardData,
            cardUrl: target.value,
          })
        );
        break;
      }
      case "cardDetails": {
        dispatch(
          setCurrentCardData({
            ...cardData,
            cardDetails: target.value,
          })
        );
        break;
      }
      case "bucketName": {
        dispatch(
          setCurrentCardData({
            ...cardData,
            bucketName: target.value,
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
      <Dialog open={isCardFormOpen} onClose={handleClose}>
        {/* Form */}
        <DialogTitle>Update Card</DialogTitle>
        <DialogContent>
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
            value={cardData.cardName}
            onChange={HandleChange}
          />
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
            value={cardData.bucketName}
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
            value={cardData.cardUrl}
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
            value={cardData.cardDetails}
            onChange={HandleChange}
          />
        </DialogContent>
        {/* Form Buttons (CRUD Actions) */}
        <DialogActions>
          <Button onClick={() => dispatch(setCurrentCardData(placeholder))}>
            Clear
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
              let data = {
                userId: auth._id.trim(),
                cardName: cardData.cardName.trim(),
                cardDetails: cardData.cardDetails.trim(),
                cardUrl: cardData.cardUrl.trim(),
                bucketName: cardData.bucketName.trim(),
              };
              updateCard(cardData._id, data);
              dispatch(setCurrentCardData(placeholder));
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpdateCardForm;
