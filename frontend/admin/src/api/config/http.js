/* eslint-disable no-undef */
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { includes } from "lodash";
import { baseUrl } from "../../config/url-config";
import { getCookie, removeCookie, setCookie } from "../../utils/cookie";
import { ACCESSTOKEN_KEY, REFRESHTOKEN_KEY } from "../../config";

const listUrlNotAuthen = ["/auth/login"];

const http = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

http.interceptors.request.use(
  async function (config) {
    let accessToken = getCookie(ACCESSTOKEN_KEY);
    if (!includes(listUrlNotAuthen, config.url)) {
      try {
        const { exp } = jwtDecode(accessToken);
        if (!exp || (exp && Date.now() > exp * 1000)) {
          await getToken((act) => {
            if (act) accessToken = act;
          });
        }
      } catch {
        await getToken((act) => {
          if (act) accessToken = act;
        });
      }
    }

    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
    return config;
  },
  function (error) {
    return error;
  }
);

http.interceptors.response.use(
  async function (response) {
    if (response.data.status === 401) {
      await getToken(() => {});
    } else return response;
  },
  async function (error) {
    if (error.response?.data?.status === 401) {
      await getToken(() => {});
    }
    return error.response;
  }
);

const getToken = async (fnSuccess) => {
  const refreshToken = getCookie(REFRESHTOKEN_KEY);
  const res = await axios.post(
    baseUrl + "/users/refresh-token",
    {
      refreshToken,
    },
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  let isSuccess = false;
  if (res.data.status === 200) {
    if (res.data.data.accessToken && res.data.data.refreshToken) {
      isSuccess = true;
      setCookie(ACCESSTOKEN_KEY, res.data.data.accessToken, {
        expires: 0.5,
      });
      setCookie(REFRESHTOKEN_KEY, res.data.data.refreshToken, {
        expires: 1,
      });
      fnSuccess(res.data.data.accessToken);
    }
  }
  if (!isSuccess) {
    removeCookie(ACCESSTOKEN_KEY);
    removeCookie(REFRESHTOKEN_KEY);
  }
};

export default http;
