// import useFetchApi from "../hooks/useFetchApi";
import AppTitle from "./AppTitle";
import ProfileUsername from "./ProfileUsername";
import ProfileRole from "./ProfileRole";

export default function Profile() {
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <AppTitle />
        <ProfileUsername />
        <ProfileRole />
      </div>
      {/* <div className="d-flex flex-column drop-some justify-content-center align-items-center">
        <form
          className="form-inline mt-3 border border-dark rounded p-4 shadow form-bring-down half-size-width"
          onSubmit={submitNewPassword}
        >
          <label
            htmlFor="inputPassword6"
            className="fs-5 me-2 special-title-with-shadow"
          >
            Change Password:
          </label>
          <div className="d-flex align-items-center drop-some">
            <input
              className="form-control me-2 input-password-box"
              type="password"
              id="inputPassword6"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-primary button-shadow">
              Submit
            </button>
          </div>
        </form>
      </div> */}
    </div>
  );
}
