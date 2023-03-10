import React from "react";
import "./styles/bucketCard.css";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

type propTypes = { type: string; details: string; name: string; theme?: any };

const BucketCard = (props: propTypes) => {
  return (
    <aside className="profile-card">
      <header>
        <a target="_blank" href="#">
          <img
            src="https://picsum.photos/seed/picsum/150"
            className="hoverZoomLink"
            alt="img"
          />
          <h1>{props.name}</h1>
        </a>
      </header>

      <div className="profile-bio">
        <p>{props.details}</p>
      </div>

      <ul className="profile-social-links"></ul>
    </aside>
  );
};

const MediaCard = (props: propTypes) => {
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {props.theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {props.theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
};

const Cards = (props: propTypes) => {
  const theme = useTheme();
  const CardRenderer = (props: propTypes) => {
    switch (props.type) {
      case "bucket": {
        return <BucketCard theme={theme} {...props} />;
        break;
      }
      case "card": {
        return <MediaCard {...props} />;
        break;
      }

      default:
        return <></>;
        break;
    }
  };

  return <CardRenderer {...props} />;
};

export default Cards;
