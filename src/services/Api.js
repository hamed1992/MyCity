import React, { Component } from "react";
import axios from "axios";
import { base_url } from "../constants";
import Cookies from "js-cookie";

class JWT extends Component {
  constructor(props) {
    super(props);
    axios.defaults.baseURL = base_url;

    axios.defaults.timeout = 10000;
  }
  setHeaderForAxios = (token) => {
    axios.interceptors.request.use(
      (config) => {
        config.headers.Authorization = "Bearer " + token; //localStorage.getItem("token");
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };

  getDataInServer = (api_route, params = {}) => {
    return axios
      .get(api_route, params)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  };
  PostDataInServer = (api_route, data = {}) => {
    return axios
      .post(api_route, data)
      .then((res) => {
        console.log("object", res);
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  };

  saveAddress = (name, address, lat, lng) => {
    let url = `users/addresses/save`;
    return axios
      .post(url, {
        title: name,
        address,
        _method: "PATCH",
        // city_id: $('#txtTitle').find(':selected').data('id'),
        lat,
        lng,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  };
  editAddress = (name, address, lat, lng, id) => {
    let url = `users/addresses/save`;
    return axios
      .post(url, {
        id,
        title: name,
        address,
        _method: "PATCH",
        // city_id: $('#txtTitle').find(':selected').data('id'),
        lat,
        lng,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  };
  deleteAddress = (id) => {
    let url = `users/addresses/${id}/delete`;
    return axios
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  };
  getAddresses = () => {
    let url = `users/addresses`;
    return axios
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  };
  registerOrder = (
    product_id,
    product_count,
    delivery_place_id,
    delivery_date,
    delivery_hour
  ) => {
    console.log("object",
    {product_id,
    product_count,
    delivery_place_id,
    delivery_date,
    delivery_hour}
    )
    let url = `shop/orders/create`;
    return axios
      .post(url, {
        product_id,
        product_count,
        delivery_place_id,
        delivery_date,
        delivery_hour,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  };
}
const silverAge = new JWT();
export default silverAge;
