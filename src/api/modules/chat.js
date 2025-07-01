import request from "../request.js";

export function getAllChats(params) {
  return request({
    url: "/chats/all",
    method: "get",
    params,
  });
}

export function addNewChat(data) {
  return request({
    url: "/chats/new",
    method: "post",
    data,
  });
}

export function updateChat(data) {
  return request({
    url: "/chats/update",
    method: "put",
    data,
  });
}

export function removeChat(param) {
  return request({
    url: `/chats/remove/${param}`,
    method: "delete",
  });
}
