import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import InfiniteScroll from "react-infinite-scroll-component";
import { LucideLoader2 } from "lucide-react";
import { DataProps } from "@/types/api.interface";

interface DistanceListProps {
  distanceList: DataProps;
  setPagination: React.Dispatch<React.SetStateAction<{ page: number; limit: number }>>;
}

export default function DistanceList({ distanceList, setPagination }: DistanceListProps) {
  return (
    <div className="w-2/3 mt-3">
      {distanceList && distanceList.data && distanceList.data.length > 0 ? (
        <InfiniteScroll
          dataLength={distanceList.data.length}
          next={() => {
            if (distanceList.data.length < distanceList.totalData) {
              setPagination((prevPagination) => ({
                ...prevPagination,
                page: prevPagination.page + 1,
              }));
            }
          }}
          hasMore={distanceList ? distanceList.data.length < distanceList.totalData : false}
          loader={<LucideLoader2 className="text-primary text-5xl text-center my-10 animate-spin m-auto" />}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Distance List - 01</TableHead>
                <TableHead>Distance List - 02</TableHead>
                <TableHead>Calculated Distance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {distanceList.data.map((listItem: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{listItem.list1}</TableCell>
                  <TableCell>{listItem.list2}</TableCell>
                  <TableCell>{listItem.distance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfiniteScroll>
      ) : (
        <div className="text-center my-10">
          <span>No distance found</span>
        </div>
      )}
    </div>
  );
}
