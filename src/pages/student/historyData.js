export const studentHistoryRecords = [
  {
    id: 3,
    height: 167.0,
    weight: 62.5,
    bloodPressure: "118/75",
    heartRate: 70,
    temperature: 36.5,
    bloodGroup: "O+",
    allergies: "Peanuts, Dust, Pollen",
    chronicConditions: "Mild asthma",
    currentMedication: "Inhaler as needed",
    visionStatus: "Needs glasses",
    hearingStatus: "Normal",
    vaccinationStatus: "Up to date",
    notes: "Student grew 1.5cm. Developed mild asthma. Prescribed glasses.",
    screeningDate: "2026-02-10",
    recordedByNurseId: 1,
    archivedAt: "2026-02-10T19:15:51.779207",
    originalHealthRecordId: 2,
  },
  {
    id: 4,
    height: 167.0,
    weight: 62.5,
    bloodPressure: "120/80",
    heartRate: 76,
    temperature: 36.5,
    bloodGroup: "O+",
    allergies: "Peanuts, Dust, Pollen,brinjal",
    chronicConditions: "Mild asthma",
    currentMedication: "Inhaler as needed",
    visionStatus: "not needed glasses",
    hearingStatus: "Normal",
    vaccinationStatus: "Up to date",
    notes: "Student grew 1.5cm. Developed mild asthma. Prescribed glasses.",
    screeningDate: "2026-02-10",
    recordedByNurseId: 1,
    archivedAt: "2026-02-10T19:17:37.873142",
    originalHealthRecordId: 2,
  },
];

export function formatScreeningDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
