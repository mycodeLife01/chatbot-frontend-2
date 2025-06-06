import request from "../request";

export function getAllMessages(params) {
  return request({
    url: "/messages",
    method: "get",
    params,
  });
}

export function addMessage(data) {
  return request({
    url: "/messages/add",
    method: "post",
    data,
  });
}

export function getAiResponse(params) {
  return request({
    url: "/messages/ai-response",
    method: "get",
    params,
  });
}
