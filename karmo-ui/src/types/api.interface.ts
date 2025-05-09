export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T;
  statusCode: number;
}

export interface PaginatedData<T> {
  data: Array<T>;
  totalData: number;
  totalDistance: number;
  limit: number;
}

export interface JourneyDistance {
  list1: number;
  list2: number;
  distance: number;
  totalDistance: number;
  totalData: number;
}

export interface DataProps {
  totalDistance: number;
  totalData: number;
  data: DataList[];
}

export interface DataList {
  list1: number;
  list2: number;
  distance: number;
}
