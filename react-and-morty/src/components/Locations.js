import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import ReactPaginate from "react-paginate";

export default function Locations(props) {
  const locationsFetched = props.locations.results;
  const pages = props.locations.info.pages;
  const [open, setOpen] = useState(false);
  const [actualLocation, setActualLocation] = useState("");

  const handleOpen = (target) => {
    setActualLocation(locationsFetched.find((x) => x.id === parseInt(target)));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const locationData = Object.entries(actualLocation);
  const body = (
    <div className="popUpCard">
      {locationData.map((elem, index) => {
        if (
          (typeof elem[1] === "string" || typeof elem[1] === "number") &&
          elem[1] !== ""
        )
          return (
            <p key={index}>
              {elem[0]}: <span className="popUpData">{elem[1]}</span>
            </p>
          );
      })}
    </div>
  );

  return (
    <div>
      {locationsFetched.map((location) => (
        <div
          key={location.id}
          id={location.id}
          onClick={(ev) => handleOpen(ev.target.id)}
          className="listCard"
        >
          <h1 id={location.id}>{location.name}</h1>
          <p id={location.id}>{location.type}</p>
        </div>
      ))}
      <Modal
        className="modal"
        data={locationData}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={props.handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
