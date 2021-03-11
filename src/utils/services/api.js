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
    try {
      const res = await axios.get(`${this.baseUrl}${this.endpoints[endpoint]}`);
      return await res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async addData(endpoint = EVENTS, newData, params) {
    try {
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
      return await res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async updateData(endpoint = EVENTS, event, params) {
    try {
      const formData = {
        data: JSON.stringify({
          fieldId: event.fieldId,
          owner: event.owner,
          title: event.title,
        }),
      };
      const config = getConfig();
      const newParams = { ...params, config };
      const res = await axios.put(
        `${this.baseUrl}${this.endpoints[endpoint]}/${event.id}`,
        formData,
        newParams,
      );
      return await res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async removeData(endpoint, event) {
    try {
      await axios.delete(
        `${this.baseUrl}${this.endpoints[endpoint]}/${event.id}`,
      );
    } catch (err) {
      console.error(err);
    }
  }
}

const apiService = new ApiService(
  'http://158.101.166.74:8080/api/data/igornep',
  ENDPOINTS,
);

export { apiService };
