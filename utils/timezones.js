module.exports = [
  { name: "UTC", value: "Z", cities: ["London", "Accra"] },
  {
    name: "US Eastern Time (EST)",
    value: "-05:00",
    cities: ["New York", "Toronto", "Miami"],
  },
  {
    name: "US Eastern Daylight Time (EDT)",
    value: "-04:00",
    cities: ["New York", "Toronto", "Miami"],
  },
  {
    name: "US Central Time (CST)",
    value: "-06:00",
    cities: ["Chicago", "Houston", "Dallas"],
  },
  {
    name: "US Central Daylight Time (CDT)",
    value: "-05:00",
    cities: ["Chicago", "Houston", "Dallas"],
  },
  {
    name: "US Mountain Time (MST)",
    value: "-07:00",
    cities: ["Denver", "Phoenix", "Salt Lake City"],
  },
  {
    name: "US Mountain Daylight Time (MDT)",
    value: "-06:00",
    cities: ["Denver", "Phoenix", "Salt Lake City"],
  },
  {
    name: "US Pacific Time (PST)",
    value: "-08:00",
    cities: ["Los Angeles", "San Francisco", "Seattle"],
  },
  {
    name: "US Pacific Daylight Time (PDT)",
    value: "-07:00",
    cities: ["Los Angeles", "San Francisco", "Seattle"],
  },
  { name: "British Summer Time (BST)", value: "+01:00", cities: ["London"] },
  {
    name: "Greenwich Mean Time (GMT)",
    value: "Z",
    cities: ["London", "Accra"],
  },
  {
    name: "Central European Time (CET)",
    value: "+01:00",
    cities: [
      "Stockholm",
      "Berlin",
      "Paris",
      "Rome",
      "Madrid",
      "Brussels",
      "Vienna",
      "Amsterdam",
    ],
  },
  {
    name: "Central European Summer Time (CEST)",
    value: "+02:00",
    cities: [
      "Stockholm",
      "Berlin",
      "Paris",
      "Rome",
      "Madrid",
      "Brussels",
      "Vienna",
      "Amsterdam",
    ],
  },
  {
    name: "Eastern European Time (EET)",
    value: "+02:00",
    cities: ["Athens", "Bucharest", "Helsinki"],
  },
  {
    name: "Eastern European Summer Time (EEST)",
    value: "+03:00",
    cities: ["Athens", "Bucharest", "Helsinki"],
  },
  { name: "Moscow Standard Time (MSK)", value: "+03:00", cities: ["Moscow"] },
  {
    name: "India Standard Time (IST)",
    value: "+05:30",
    cities: ["New Delhi", "Mumbai"],
  },
  {
    name: "China Standard Time (CST)",
    value: "+08:00",
    cities: ["Beijing", "Shanghai"],
  },
  { name: "Japan Standard Time (JST)", value: "+09:00", cities: ["Tokyo"] },
  {
    name: "Australian Eastern Standard Time (AEST)",
    value: "+10:00",
    cities: ["Sydney", "Melbourne"],
  },
  {
    name: "Australian Eastern Daylight Time (AEDT)",
    value: "+11:00",
    cities: ["Sydney", "Melbourne"],
  },
  {
    name: "New Zealand Standard Time (NZST)",
    value: "+12:00",
    cities: ["Wellington", "Auckland"],
  },
  {
    name: "New Zealand Daylight Time (NZDT)",
    value: "+13:00",
    cities: ["Wellington", "Auckland"],
  },
  {
    name: "Hawaii-Aleutian Standard Time (HST)",
    value: "-10:00",
    cities: ["Honolulu"],
  },
  {
    name: "Alaska Standard Time (AKST)",
    value: "-09:00",
    cities: ["Anchorage"],
  },
  {
    name: "Alaska Daylight Time (AKDT)",
    value: "-08:00",
    cities: ["Anchorage"],
  },
  {
    name: "Atlantic Standard Time (AST)",
    value: "-04:00",
    cities: ["San Juan", "Halifax"],
  },
  {
    name: "Atlantic Daylight Time (ADT)",
    value: "-03:00",
    cities: ["San Juan", "Halifax"],
  },
  {
    name: "Brazil Standard Time (BRT)",
    value: "-03:00",
    cities: ["Brasília", "Rio de Janeiro"],
  },
  {
    name: "Argentina Standard Time (ART)",
    value: "-03:00",
    cities: ["Buenos Aires"],
  },
  {
    name: "West Africa Time (WAT)",
    value: "+01:00",
    cities: ["Lagos", "Kinshasa"],
  },
  {
    name: "South Africa Standard Time (SAST)",
    value: "+02:00",
    cities: ["Johannesburg", "Cape Town"],
  },
  {
    name: "Arabia Standard Time (AST)",
    value: "+03:00",
    cities: ["Riyadh", "Kuwait City"],
  },
  {
    name: "Pakistan Standard Time (PKT)",
    value: "+05:00",
    cities: ["Karachi", "Lahore"],
  },
  {
    name: "Bangladesh Standard Time (BST)",
    value: "+06:00",
    cities: ["Dhaka"],
  },
  {
    name: "Indochina Time (ICT)",
    value: "+07:00",
    cities: ["Bangkok", "Hanoi"],
  },
  {
    name: "Philippine Standard Time (PST)",
    value: "+08:00",
    cities: ["Manila"],
  },
  { name: "Korea Standard Time (KST)", value: "+09:00", cities: ["Seoul"] },
  {
    name: "Australian Central Standard Time (ACST)",
    value: "+09:30",
    cities: ["Adelaide"],
  },
  {
    name: "Australian Central Daylight Time (ACDT)",
    value: "+10:30",
    cities: ["Adelaide"],
  },
  {
    name: "Australian Western Standard Time (AWST)",
    value: "+08:00",
    cities: ["Perth"],
  },
];

function localTimezone() {
  const offset = -new Date().getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const absOffset = Math.abs(offset);
  const hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
  const minutes = String(absOffset % 60).padStart(2, "0");
  return `${sign}${hours}:${minutes}`;
}

module.exports.localTimezone = localTimezone;
