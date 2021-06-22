import axios from "axios";

const baseURL = 'http://b2b.yoursthangam.com/api/';

export function ApiGet(url) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: url,
      baseURL: baseURL,
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(function (data) {
        resolve(data);
      })
      .catch(function (error) {
        console.log('eror', error);
        resolve();
      });
  });
}

export function ApiPost(url,data) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: url,
      baseURL: baseURL,
      headers: {
        'content-type': 'application/json',
      },
      data:data
    })
      .then(function (data) {
        resolve(data);
      })
      .catch(function (error) {
        console.log('eror', error);
        resolve();
      });
  });
}
