/* eslint-disable react/prop-types */
export default function AdminBackpacks({ backpacks, displayGearList }) {
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Backpack Name</th>
            <th scope="col">Location</th>
            <th scope="col">User</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {backpacks.map((val, key) => {
            return (
              <tr key={key}>
                <td>
                  <button onClick={() => displayGearList(val.backpackId)}>
                    Show Gear
                  </button>
                </td>
                <td>{val.backpackName}</td>
                <td>{val.location}</td>
                <td>{val.ownerUsername}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
