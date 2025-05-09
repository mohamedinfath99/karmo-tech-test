import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface DistanceProps {
  distance: number;
}

export default function DistanceCard({ distance }: DistanceProps) {
  return (
    <div className="p-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Total Calculated Distance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl text-center font-semibold">{distance}</p>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}
