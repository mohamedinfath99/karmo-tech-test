'use client';

import { useEffect, useState } from 'react';
import { DataProps } from '@/types/api.interface';
import apiServices from '@/services/api.services';
import DistanceCard from '@/components/distance-card';
import DistanceList from '@/components/distance-list';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDistanceList() {
      try {
        setIsLoading(true);
        const resp = await apiServices.distance.getAllJourneyDistance(pagination);
        const { totalData, totalDistance, data } = resp.data;

        if (data) {
          setDistanceList((prevState) => ({
            totalData,
            totalDistance,
            data: pagination.page > 1 ? [...prevState.data, ...data] : data,
          }));
        }
      } catch (err) {
        if (err instanceof Error) {
          if (err.name !== 'AbortError') {
            console.log(err.message);
          }
        } else {
          console.log('An unknown error occurred', err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadDistanceList();

    return () => {
      controller.abort();
    };
  }, [pagination]);

  return (
    <div className='py-5 flex flex-col items-center bg-blue-200/20'>
      <DistanceCard distance={distanceList.totalDistance} isLoading={isLoading} />
      <DistanceList distanceList={distanceList} setPagination={setPagination} />
    </div>
  );
}
