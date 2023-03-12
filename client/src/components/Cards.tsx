import React from "react";
import styles from "./styles/bucketCard.module.scss";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Update } from "@mui/icons-material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { deleteBucket } from "../scripts/bucketUtils";
import { useSelector, useDispatch } from "react-redux";
import { openForm } from "../redux/openFormSlice";
import { openGrid } from "../redux/openGridSlice";
import { setCurrentBucket } from "../redux/currentBucketSlice";
import { deleteCard } from "../scripts/cardUtils";
import { openCardUpdateForm } from "../redux/openCardFormSlice";
import { setCurrentCard } from "../redux/currentCardSlice";
import { setUrl, openIFrame } from "../redux/iframe";
import { setCurrentBucketData, setCurrentCardData } from "../redux/currentData";
import { setHistory } from "../redux/history";

// Custom props type for cards
type propTypes = {
  type?: string;
  data: any;
  theme?: any;
  reduxDispatch?: any;
  currentHistory?: any;
};

// Bucket Card Component
const BucketCard = (props: propTypes) => {
  return (
    <div className={styles["bucket-card"]}>
      {/* Card Content */}
      <header>
        <a target="_blank" href="#">
          <img
            src="/placeholder.jpg"
            className={styles["hoverZoomLink"]}
            alt="img"
          />
          <h1>{props.data.bucketName}</h1>
        </a>
      </header>
      <div className={styles["bucket-bio"]}>
        <p>{props.data.bucketDetails}</p>
      </div>
      {/* Card Buttons (CRUD Actions) */}
      <ul className={styles["bucket-buttons"]}>
        <Button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            deleteBucket(props.data._id, props.data)
          }
        >
          <DeleteIcon
            style={{ color: "#3da58a", fontSize: "1.5rem", cursor: "pointer" }}
          />
        </Button>
        <Button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            props.reduxDispatch(setCurrentBucket(props.data.bucketName));
            props.reduxDispatch(openGrid());
          }}
        >
          <ArrowRightIcon
            style={{ color: "#3da58a", fontSize: "3.5rem", cursor: "pointer" }}
          />
        </Button>
        <Button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            props.reduxDispatch(setCurrentBucketData(props.data));
            props.reduxDispatch(setCurrentBucket(props.data.bucketName));
            props.reduxDispatch(openForm());
          }}
        >
          <Update
            style={{ color: "#3da58a", fontSize: "1.5rem", cursor: "pointer" }}
          />
        </Button>
      </ul>
    </div>
  );
};

// Video Card Component
const MediaCard = (props: propTypes) => {
  return (
    <Card sx={{ display: "flex", gap: 3.5 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {/* Card Content */}
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography width="auto " variant="h5" textTransform="capitalize">
            {props.data.cardName.length > 20
              ? `${props.data.cardName.substring(0, 20)}...`
              : props.data.cardName}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            textTransform="capitalize"
          >
            {props.data.cardDetails}
          </Typography>
        </CardContent>
        {/* Card Buttons (CRUD Actions) */}
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton
            aria-label="delete"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              deleteCard(props.data._id, props.data)
            }
          >
            <DeleteIcon
              style={{
                color: "rgba(0,0,0,0.54)",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            />
          </IconButton>
          <IconButton
            aria-label="play/pause"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              props.reduxDispatch(setUrl(props.data.cardUrl));
              props.reduxDispatch(openIFrame());
              props.reduxDispatch(
                setHistory([
                  ...props.currentHistory,
                  { ...props.data, playedOn: new Date() },
                ])
              );
            }}
          >
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton
            aria-label="update"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              props.reduxDispatch(setCurrentCardData(props.data));
              props.reduxDispatch(setCurrentCard(props.data._id));
              props.reduxDispatch(openCardUpdateForm());
            }}
          >
            <Update
              style={{
                color: "rgba(0,0,0,0.54)",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            />
          </IconButton>
        </Box>
      </Box>
      {/* Card Image */}
      <CardMedia
        component="img"
        sx={{ width: 250, height: 155.75 }}
        image="/videoPlaceholder.webp"
        alt="Live from space album cover"
      />
    </Card>
  );
};

const Cards = (props: propTypes) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { history } = useSelector((state: any) => state.currentHistory);

  // Function for rendering cards based on type
  const CardRenderer = () => {
    switch (props.type) {
      case "bucket": {
        return (
          <BucketCard
            theme={theme}
            data={props.data}
            reduxDispatch={dispatch}
          />
        );
        break;
      }
      case "card": {
        return (
          <MediaCard
            theme={theme}
            currentHistory={history}
            reduxDispatch={dispatch}
            data={props.data}
          />
        );
        break;
      }

      default:
        return <></>;
        break;
    }
  };

  return <CardRenderer />;
};

export default Cards;
