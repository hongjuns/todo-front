import { API_BASE_URL } from "../config/app-config";

export function call(api, method, request) {
  
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // 로컬 스토리지에서 ACCESS TOKEN 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    // GET method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          // response.ok가 true이면 정상적인 리스폰스를 받은것, 아니면 에러 리스폰스를 받은것.
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch((error) => {
      if (error.status === 403) {
        window.location.href = "/login"; // redirect
      }else if (error.status === 401){
        alert(error.message);
        localStorage.removeItem('ACCESS_TOKEN');
        window.location.href = "/"; 
      }
      else{
        //error.message
        alert(error.error);
      }
      return Promise.reject(error);
    });
}

