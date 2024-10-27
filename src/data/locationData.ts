export interface Location {
  province: string;
  districts: {
    name: string;
    subdistricts: string[];
  }[];
}

export const locationData: Location[] = [
  {
    province: "Bangkok",
    districts: [
      {
        name: "Pathum Wan",
        subdistricts: ["Lumphini", "Pathum Wan", "Rong Muang"]
      },
      {
        name: "Watthana",
        subdistricts: ["Khlong Toei Nuea", "Khlong Tan", "Phra Khanong"]
      }
    ]
  },
  {
    province: "Chiang Mai",
    districts: [
      {
        name: "Mueang Chiang Mai",
        subdistricts: ["Chang Khlan", "Hai Ya", "Si Phum"]
      },
      {
        name: "Hang Dong",
        subdistricts: ["Ban Waen", "Nam Phrae", "San Phak Wan"]
      }
    ]
  }
];

export const mockEmailCheck = async (email: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Mock existing emails
  const existingEmails = ['john.doe@example.com', 'test@example.com'];
  return existingEmails.includes(email);
};