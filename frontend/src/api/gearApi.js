export async function displayGearList({
  backpackId,
  setGearList,
  setLoading,
  setDisplayGear,
  setError,
}) {
  setLoading(true);
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`/api/gearlists/gear/${backpackId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error getting the gear list!  ${response.status}`);
    }
    const data = await response.json();
    setGearList(data);
    setDisplayGear(true);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
}
