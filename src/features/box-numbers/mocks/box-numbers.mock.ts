import { BoxNumber } from "../box-number.schema"

const boxNumberData = [
  { name: "Box-101", location: "Front Shelf A", description: "Small components" },
  { name: "Drawer-B", location: "Back Room Cabinet", description: "iPhone screens" },
  { name: "Shelf-C", location: "Main Store Floor", description: "Laptop batteries" },
  { name: "Bin-203", location: "Warehouse Section 3", description: "Used parts" },
  { name: "Box-102", location: "Front Shelf A", description: "Charging ports" },
  { name: "Drawer-C", location: "Back Room Cabinet", description: "Android screens" },
  { name: "Shelf-D", location: "Main Store Floor", description: "Tablet digitizers" },
  { name: "Bin-204", location: "Warehouse Section 3", description: "Recycled materials" },
  { name: "Box-103", location: "Front Shelf B", description: "Flex cables" },
  { name: "Drawer-D", location: "Back Room Cabinet", description: "MacBook parts" },
  { name: "Shelf-E", location: "Main Store Floor", description: "Power adapters" },
  { name: "Bin-205", location: "Warehouse Section 4", description: "Tools" },
  { name: "Box-104", location: "Front Shelf B", description: "Speakers" },
  { name: "Drawer-E", location: "Back Room Cabinet", description: "Camera modules" },
  { name: "Shelf-F", location: "Main Store Floor", description: "Keyboards" },
];

/**
 * Generates mock box number data for testing and development.
 * Standardized to use 'isActive' boolean logic for consistency.
 */
const generateBoxNumbers = (count: number): BoxNumber[] => {
  const boxNumbers: BoxNumber[] = [];
  for (let i = 0; i < count; i++) {
    const boxInfo = boxNumberData[i % boxNumberData.length];
    const isDuplicate = i >= boxNumberData.length;
    
    boxNumbers.push({
      id: `box-${String(100 + i).padStart(3, '0')}`,
      name: isDuplicate ? `${boxInfo.name} ${Math.floor(i / boxNumberData.length) + 1}` : boxInfo.name,
      location: boxInfo.location,
      description: boxInfo.description,
      // FIX: Changed 'status' to 'isActive' boolean. 
      // i % 4 === 0 makes every 4th item inactive for testing purposes.
      isActive: i % 4 !== 0, 
    });
  }
  return boxNumbers;
};

export const mockBoxNumbers: BoxNumber[] = generateBoxNumbers(25);