import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Ward temple night: May 10", "Youth activity this Friday"],
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Williams",
    wardBusiness: [{ description: "Sustaining of new Primary president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: "Sister Brown", topic: "Faith in Jesus Christ", type: "speaker" },
      { name: "Youth Choir", topic: "I Am a Child of God", type: "musical-number" },
    ],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother Davis",
  },
  {
    id: 2,
    date: "2026-05-10",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Thompson",
    announcements: ["Stake conference next month"],
    openingHymn: { number: 3, title: "Now Let Us Rejoice" },
    openingPrayer: "Brother Adams",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 194, title: "There Is a Green Hill Far Away" },
    speakers: [],
    closingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
    closingPrayer: "Sister Miller",
  },
  {
    id: 3,
    date: "2026-05-17",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Sister Clark",
    announcements: ["Blood drive next Saturday"],
    openingHymn: { number: 5, title: "High on the Mountain Top" },
    openingPrayer: "Brother Lee",
    wardBusiness: [{ description: "Callings to be sustained" }],
    stakeBusiness: true,
    sacramentHymn: { number: 175, title: "O God, the Eternal Father" },
    speakers: [
      { name: "Brother Nelson", topic: "The Power of Prayer", type: "speaker" },
      { name: "Sister Garcia", topic: "Service", type: "speaker" },
    ],
    closingHymn: { number: 227, title: "How Firm a Foundation" },
    closingPrayer: "Sister Patel",
  },
  {
    id: 4,
    date: "2026-05-24",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 7, title: "Israel, Israel, God Is Calling" },
    openingPrayer: "Sister Kim",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 187, title: "God Loved Us, So He Sent His Son" },
    speakers: [
      { name: "Elder Thompson", topic: "Repentance", type: "speaker" },
    ],
    closingHymn: { number: 85, title: "How Firm a Foundation" },
    closingPrayer: "Brother Wright",
  },
  {
    id: 5,
    date: "2026-05-31",
    meetingType: "stake",
    presiding: "Stake President Young",
    conducting: "Brother Jensen",
    announcements: ["Stake picnic next Saturday"],
    openingHymn: { number: 1, title: "The Morning Breaks" },
    openingPrayer: "Sister Foster",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 193, title: "I Stand All Amazed" },
    speakers: [
      { name: "Sister Alvarez", topic: "Covenants", type: "speaker" },
      { name: "Brother Kim", topic: "Missionary Work", type: "speaker" },
    ],
    closingHymn: { number: 152, title: "God Be with You Till We Meet Again" },
    closingPrayer: "Brother Ortega",
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((m) => m.date === date);
  }
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}