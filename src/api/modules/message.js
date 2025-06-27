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
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function getAiResponse(params) {
  return request({
    url: "/messages/ai-response",
    method: "get",
    params,
  });
}

export function getAiStreamResponse(params, onMessage, onError, onComplete) {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;
  const searchParams = new URLSearchParams({
    ...params,
    ...(token && { token })
  });

  const eventSource = new EventSource(`http://127.0.0.1:8000/messages/ai-response?${searchParams}`);

    eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      
      if (data.type === 'done') {
        eventSource.close();
        onComplete?.();
        return;
      }
      
      if (data.type === 'error') {
        eventSource.close();
        onError?.(new Error(data.message));
        return;
      }
      
      if (data.type === 'chunk') {
        onMessage?.(data);
      }
    } catch {
      // 如果不是JSON格式，直接传递原始数据
      onMessage?.({ content: event.data });
    }
  };

  eventSource.onerror = (error) => {
    eventSource.close();
    onError?.(error);
  };

  return eventSource;
}


