/* eslint-disable no-console */
/* eslint-disable consistent-return */
import axios from 'axios';
import ENDPOINTS, { EVENTS } from './endpoints';

const getConfig = () => ({
  headers: {
    'Content-type': 'application/json',
  },
});

class ApiService {
  constructor(baseUrl, endpoints) {
    if (ApiService.isExist) {
      return ApiService.instance;
    }
    ApiService.instance = this;
    ApiService.isExist = true;
    this.endpoints = endpoints;
    this.baseUrl = baseUrl;
  }

  async getData(endpoint = EVENTS) {
    const res = await axios.get(`${this.baseUrl}${this.endpoints[endpoint]}`);
    return res.data;
  }

  async addData(endpoint = EVENTS, newData, params) {
    const formData = {
      data: JSON.stringify(newData),
    };
    const config = getConfig();
    const newParams = { ...params, config };
    const res = await axios.post(
      `${this.baseUrl}${this.endpoints[endpoint]}`,
      formData,
      newParams,
    );
    return res.data;
  }

  async updateData(endpoint = EVENTS, event, params) {
    const formData = {
      data: JSON.stringify({
        fieldId: event.fieldId,
        owner: event.owner,
        title: event.title,
        day: event.day,
        time: event.time,
      }),
    };
    const config = getConfig();
    const newParams = { ...params, config };
    const res = await axios.put(
      `${this.baseUrl}${this.endpoints[endpoint]}/${event.id}`,
      formData,
      newParams,
    );
    return res.data;
  }

  async removeData(endpoint, event) {
    await axios.delete(
      `${this.baseUrl}${this.endpoints[endpoint]}/${event.id}`,
    );
  }
}

const apiService = new ApiService(
  'http://158.101.166.74:8080/api/data/igornep',
  ENDPOINTS,
);

export { apiService };
