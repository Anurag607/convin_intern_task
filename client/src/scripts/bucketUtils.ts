const updateBucket = (
  id: string,
  body: { bucketName: string; bucketDetails: string; userId: string }
) => {
  try {
    let status = 200;
    fetch(`${import.meta.env.VITE_RENDER}/api/buckets/updateBucket/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((response) => {
      status = response.status;
      if (status === 200) window.location.reload();
    });
  } catch (err: any) {
    console.error(err.message);
  }
};

const deleteBucket = (
  id: string,
  body: { bucketName: string; bucketDetails: string; userId: string }
) => {
  try {
    let status = 200;
    fetch(`${import.meta.env.VITE_RENDER}/api/buckets/deleteBucket/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((response) => {
      status = response.status;
      if (status === 200) window.location.reload();
    });
  } catch (err: any) {
    console.error(err.message);
  }
};

export { updateBucket, deleteBucket };
