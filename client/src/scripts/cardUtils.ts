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

const deleteManyCard = (rows: any) => {
  const cards: any = [];
  rows.forEach((row: any) => {
    let flag = true;
    cards.forEach((card: any) => {
      if (card._id !== undefined && card._id === row._id) flag = false;
    });
    if (flag) cards.push(row);
  });
  cards.forEach((card: any) => {
    let { _id, _v, updatedAt, createdAt, ...body } = card;
    deleteCard(_id, body);
  });
};

export { updateCard, deleteCard, deleteManyCard };
