import axios from "axios";

// const REST_API_BASE_URL =
//   "https://bonzer-goniometrical-queenie.ngrok-free.dev/asp/";

const REST_API_BASE_URL = "http://192.168.22.122:8080/asp/";

export const getDetailsAPI = async (url) => {
  try {
    const API_Url = REST_API_BASE_URL + url;
    const response = await axios.post(
      API_Url,
      {}, // empty body if not needed
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // return only the data
  } catch (error) {
    console.error("Error fetching menu details:", error);
    return []; // return empty array on error
  }
};

export const postDataApi = async (url, data = {}) => {
  try {
    const API_Url = REST_API_BASE_URL + url;
    const response = await axios.post(API_Url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // return only the data
  } catch (error) {
    console.error("Error posting data:", error);
    return null; // return null on error
  }
};

export const postImage = async (url, data = {}) => {
  try {
    const API_Url = REST_API_BASE_URL + url;
    const response = await axios.post(API_Url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // return only the data
  } catch (error) {
    console.error("Error posting data:", error);
    return null; // return null on error
  }
};
