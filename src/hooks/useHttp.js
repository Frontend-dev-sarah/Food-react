import { BASE_URL } from "../common/constant";

const useHttp = async (
  BASE_URL,
  method = "GET",
  body,
  dispatchSuccess,
  dispatchFail
) => {
  try {
    const response = await fetch(BASE_URL, {
      method: method,
      body: body ? JSON.stringify(body) : {},
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      dispatchSuccess();
    } else {
      throw Error("Add meal failed !");
    }
    return response;
  } catch (error) {
    dispatchFail();
  }
};
export default useHttp;
