/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../components/common/Modal";

jest.mock("../components/elements/InputBox", () => (props) => (
  <div>InputBox: {props.field}</div>
));
jest.mock("../helpers/translateFieldsForUser", () => ({
  translateFieldsForUser: (field) => `Label for ${field}`,
}));


describe("Modal", () => {
  test("does render when isOpen is false", () => {
    render(<Modal isOpen={false} onClose={() => {}} title={"Modal Title"} />);

    expect(screen.queryByText(/modal title/i)).not.toBeInTheDocument();
  });

  test("render form with fields when isOpen is true", () => {
    render(
      <Modal
        isOpen={true}
        fields={["itemName", "privateValue"]}
        title={"Modal Title"}
        url={`/api/dummy/link`}
        method={"POST"}
        onSuccess={() => {}}
      />
    );

    expect(screen.getByText("Label for itemName")).toBeInTheDocument();
    expect(screen.getByText("Label for privateValue")).toBeInTheDocument();
    expect(screen.getByText("InputBox: itemName")).toBeInTheDocument();
    expect(screen.getByText("InputBox: privateValue")).toBeInTheDocument();
  });
});
