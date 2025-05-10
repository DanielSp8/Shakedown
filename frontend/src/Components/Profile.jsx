import AppTitle from "./AppTitle";
import ProfileUsername from "./ProfileUsername";
import ProfileRole from "./ProfileRole";

export default function Profile() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <AppTitle />
      <ProfileUsername />
      <ProfileRole />
    </div>
  );
}
