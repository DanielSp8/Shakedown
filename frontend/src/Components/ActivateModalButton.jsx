/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "./Modal";

export default function ActivateModalButton(props) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button className="btn btn-success" onClick={() => setModal(true)}>
        {props.buttonTitle}
      </button>
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={props.title}
        fields={props.fields}
        url={props.url}
        method={props.method}
        onSuccess={props.onSuccess}
      />
    </>
  );
}
