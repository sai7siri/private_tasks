import { startpoint } from "./private/api";
import axios from "axios";

export const createUser = async (form) => {
  try {
    const url = `${startpoint}/api/v1/signup`;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("profile", form.profile);

    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

export const logOutUser = async (form) => {
  try {
    const url = `${startpoint}/api/v1/logout`;

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

// tasks apis

export const fetchAllData = async () => {
  const url = `${startpoint}/api/v1/getalltask`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization" : `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await res.json();
    return result;
  } catch (err) {
    return err;
  }
};

export const fetchImportantData = async () => {
  const url = `${startpoint}/api/v1/getimportant`;
  try {
    const res = await axios.get(url, {
      headers: {
        "Authorization": `${localStorage.getItem("token")}`
      },
      credentials: "include",
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const fetchCompleteData = async () => {
  const url = `${startpoint}/api/v1/getComplete`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await res.json();
    return result;
  } catch (err) {
    return err;
  }
};

export const addTask = async (data) => {
  try {
    const url = `${startpoint}/api/v1/addtask`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  } catch (err) {
    return err;
  }
};

export const updateTask = async (data, id) => {
  try {
    const url = `${startpoint}/api/v1/updatetask/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  } catch (err) {
    return err;
  }
};

export const updateImpartTask = async (data, id) => {
  try {
    const url = `${startpoint}/api/v1/updateimportant/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  } catch (err) {
    return err;
  }
};

export const updateCompleteTask = async (data, id) => {
  try {
    const url = `${startpoint}/api/v1/updatecomplete/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  } catch (err) {
    return err;
  }
};

export const deleteTask = async (id) => {
  try {
    const url = `${startpoint}/api/v1/deletetask/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await res.json();

    return result;
  } catch (err) {
    return err;
  }
};
