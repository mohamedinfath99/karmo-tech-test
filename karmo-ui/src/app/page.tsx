"use client";

import { useEffect, useState } from "react";
import { DataProps } from "@/types/api.interface";
import apiServices from "@/services/api.services";
import DistanceCard from "@/components/distance-card";
import DistanceList from "@/components/distance-list";

export default function DistanceUi() {
  const [distanceList, setDistanceList] = useState<DataProps>({
    totalDistance: 0,
    totalData: 0,
    data: [],
  });
  const [pagination, setPagination] = useState<{ page: number; limit: number }>({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    loadDistanceList();
  }, [pagination]);

  async function loadDistanceList() {
    try {
      const resp = await apiServices.distance.getAllJourneyDistance(pagination);
      const { totalData, totalDistance, data } = resp.data;

      if (data) {
        setDistanceList((prevState) => ({
          totalData,
          totalDistance,
          data: pagination.page > 1 ? [...prevState.data, ...data] : data,
        }));
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="px-40 py-5 flex flex-col items-center bg-blue-200/20">
      <DistanceCard distance={distanceList.totalDistance} />
      <DistanceList distanceList={distanceList} setPagination={setPagination} />
    </div>
  );
}
