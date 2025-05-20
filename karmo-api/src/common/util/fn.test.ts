import { calculateDistanceFromFile } from './fn';
import * as fs from 'fs';

describe('calculateDistanceFromFile', () => {
  const mockFilePath = 'test-input.txt';

  beforeAll(() => {
    fs.writeFileSync(mockFilePath, `57643   17620\n19062   47340\n11105   16109\n72032   30050\n16289   65967\n42361   35795\n45873   16124\n16167   65832\n`);
  });

  afterAll(() => {
    fs.unlinkSync(mockFilePath);
  });

  it('should calculate the total distance correctly', async () => {
    const result = await calculateDistanceFromFile(mockFilePath);

    console.log('Test Result:', result);

    const expectedList1 = [11105, 16167, 16289, 19062, 42361, 45873, 57643, 72032];
    const expectedList2 = [16109, 16124, 17620, 30050, 35795, 47340, 65832, 65967];

    const expectedPairedDistances = expectedList1.map((val, i) => Math.abs(val - expectedList2[i]));
    const expectedTotalDistance = expectedPairedDistances.reduce((sum, d) => sum + d, 0);

    expect(result.list1).toEqual(expectedList1);
    expect(result.list2).toEqual(expectedList2);
    expect(result.pairedDistances).toEqual(expectedPairedDistances);
    expect(result.totalDistance).toBe(expectedTotalDistance);
  });
});
