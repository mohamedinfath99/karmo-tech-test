import ENV from "@/constants/ENV";
import { JourneyDistance, PaginatedData, PaginationParams } from "@/types/api.interface";
import axios from "axios";

const backendAPI = axios.create({
  baseURL: ENV.apiEndpoint,
});

const distance = {
  getAllJourneyDistance: (pagination?: PaginationParams) => {
    return backendAPI.get<PaginatedData<JourneyDistance>>(`/karmo/calculate-distance`, {
      params: pagination,
    });
  },
};

export default {
  distance,
};
