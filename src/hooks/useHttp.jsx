import axios from "axios";
import { useDispatch } from "react-redux";
import { setUsers } from "../redux/users/usersSlice";

const useHttp = () => {
  const dispatch = useDispatch();

  const fetchData = async (url, method, data) => {
    try {
      const response = await axios({
        method: method,
        url: url,
        data: data,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Erro na requisição");
    }
  };

  const get = async (url) => {
    const data = await fetchData(url, "GET");

    dispatch(setUsers(data));
    return data;
  };

  return { get };
};

export default useHttp;
