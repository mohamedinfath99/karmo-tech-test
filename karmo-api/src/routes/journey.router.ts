import { ApiRequest } from '@src/common/types/api-request.type';
import { ApiResponse } from '@src/common/types/api-response.type';
import { calculateDistanceFromFile } from '@src/common/util/fn';
import { Router } from 'express';
import path from 'path';

const data = {
  inputData: path.join(__dirname, '../common/data/input.txt'),
};

const journeyRouter = Router();

journeyRouter.get('/calculate-distance', async (req: ApiRequest, res: ApiResponse): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  const fileData = await calculateDistanceFromFile(data.inputData);

  const totalDistance = fileData.totalDistance;
  const totalData = fileData.list1.length;

  const slicedList1 = fileData.list1.slice(offset, offset + limit);
  const slicedList2 = fileData.list2.slice(offset, offset + limit);
  const minLength = Math.min(slicedList1.length, slicedList2.length);

  const paginatedResult = Array.from({ length: minLength }).map((_, i) => ({
    list1: slicedList1[i],
    list2: slicedList2[i],
    distance: Math.abs(slicedList1[i] - slicedList2[i]),
  }));

  res.json({
    message: 'success',
    totalDistance,
    totalData,
    data: paginatedResult,
  });
});

export default journeyRouter;
