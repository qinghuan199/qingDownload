import Cookies from "js-cookie";

const TokenKey = "Admin-Token-down";
const UserIdKey = "Admin-UserId-down";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token);
  return Cookies.set(TokenKey, token, { expires: 7 });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getUserId() {
  return Cookies.get(UserIdKey);
}

export function setUserId(UserId) {
  // return Cookies.set(UserIdKey, UserId);
  return Cookies.set(UserIdKey, UserId, { expires: 7 });
}

export function removeUserId() {
  return Cookies.remove(UserIdKey);
}
