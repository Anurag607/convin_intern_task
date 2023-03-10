import React from "react";
import Header from "../../components/Header";
import Cards from "../../components/Cards";

import { Box } from "@mui/material";

const Dashboard = () => {
  const [auth, setAuth] = React.useState(
    JSON.parse(localStorage.getItem("auth") || "{}")
  );
  const [buckets, setBuckets] = React.useState([]);

  const getBucketList = () => {
    let data: any = [];
    fetch(
      `${import.meta.env.VITE_LOCALHOST_SERVER}/api/buckets/getUsersBuckets/${
        auth._id
      }`,
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

    setBuckets(data);
  };

  React.useEffect(() => {
    getBucketList();
  }, []);

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
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          gap={10}
          width="100%"
          height="90%"
        >
          {buckets.map((el: any, i) => {
            return <Cards type="bucket" {...el} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
