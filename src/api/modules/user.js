import request from "../request";

export function login(data) {
  const formData = new FormData()
  formData.append('username', data.username)
  formData.append('password', data.password)
  
  return request({
    url: "/users/login",
    method: "post",
    data: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export function register(data) {
  return request({
    url: "/users/register",
    method: "post",
    data,
  })
}

export function getLoggedInUser() {
  return request({
    url: "/users/me",
    method: "get",
  });
}
