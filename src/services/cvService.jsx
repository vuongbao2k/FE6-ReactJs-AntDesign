import { get, post } from "../utils/request";

export const createCV = async (options) => {
  const result = await post(`cv`, options);
  return result;
}

export const getListCV = async (id) => {
  const result = await get(`cv?idCompany=${id}`);
  return result;
}