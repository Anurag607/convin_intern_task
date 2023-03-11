import React from "react";
import Header from "../../components/Header";
import Cards from "../../components/Cards";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import IFrame from "../../components/Iframe";

const History = () => {
  const { history } = useSelector((state: any) => state.currentHistory);

  // Placeholder component when the watch history is empty
  const Placeholder = () => {
    return (
      <Typography width="100%" variant="h4" textTransform="capitalize">
        Nothing here yet...
      </Typography>
    );
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
        <Header title="HISTORY" subTitle="" />
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
          {history.length === 0 ? (
            <Placeholder />
          ) : (
            history.map((el: any, i: number) => {
              return (
                // Previously played video cards are rendered here...
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {/* Time the video was played on */}
                  <Typography
                    component={"div"}
                    variant="h6"
                    fontSize={17}
                    sx={{ display: "flex", width: "auto", gap: "0.5rem" }}
                  >
                    <span>{`${i + 1}) Played On:`}</span>
                    <span>
                      {el.playedOn.getHours() +
                        ":" +
                        el.playedOn.getMinutes() +
                        ":" +
                        el.playedOn.getSeconds()}
                    </span>
                  </Typography>
                  {/* Card */}
                  <Cards key={i} type="card" data={el} />
                </div>
              );
            })
          )}
        </Box>
      </Box>
      <IFrame />
    </Box>
  );
};

export default History;
