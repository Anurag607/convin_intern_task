const updateCard = (
  id: string,
  body: {
    cardName: string;
    userId: string;
    bucketName: string;
    cardUrl: string;
    cardDetails: string;
  }
) => {
  try {
    let status = 200;
    fetch(`${import.meta.env.VITE_RENDER}/api/cards/updateCard/${id}`, {
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

const deleteCard = (
  id: string,
  body: {
    cardName: string;
    userId: string;
    bucketName: string;
    cardUrl: string;
    cardDetails: string;
  }
) => {
  try {
    let status = 200;
    fetch(`${import.meta.env.VITE_RENDER}/api/cards/deleteCard/${id}`, {
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

export { updateCard, deleteCard };
