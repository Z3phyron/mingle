import axios from "axios";

const API_URL = "/api/user/";
const FRIENDS_URL = "/api/user/friends";
const FOLLOW_URL = "/api/user/followUser";

// Update user
const allUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  if (response.data) {
    localStorage.setItem("allUser", JSON.stringify(response.data));
  }

  return response.data;
};
// Update user
const updateUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, userData, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
// Follow user
const followUser = async (id, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  console.log(id)

  const response = await axios.put(FOLLOW_URL, {id: id} , config);

  // if (response.data) {
  //   localStorage.setItem("", JSON.stringify(response.data));
  // }

  return response.data;
};
// Follow user
const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL, id, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Follow user
const getFriends = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${FRIENDS_URL}/${userId}`, config);

  if (response.data) {
    localStorage.setItem("friends", JSON.stringify(response.data));
  }

  return response.data;
};

// Follow user
const getFriend = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}${userId}/friend`, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const userService = {
  updateUser,
  allUsers,
  deleteUser,
  followUser,
  getFriends,
  getFriend,
};

export default userService;
