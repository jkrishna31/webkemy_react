import { CalendarEvent } from "@/lib/ui/elements/calendar/EventBadge";

const _date = new Date();
const _year = _date.getUTCFullYear();
const _month = _date.getUTCMonth();

export const allEvents: CalendarEvent[] = [
  {
    id: "ev412nlk",
    title: "Team Breakfast",
    start: new Date(_year, 0, 4, 3).toUTCString(),
    end: new Date(_year, 0, 4, 5, 30).toUTCString(),
  },
  {
    id: "ev422nlk",
    title: "Happy Hour",
    start: new Date(_year, 0, 4, 7, 45).toUTCString(),
    end: new Date(_year, 0, 5, 1, 15).toUTCString(),
    color: "red",
  },
  {
    id: "cxk2nlk",
    title: "Asia Market Review",
    start: new Date(_year, 0, 8, 2).toUTCString(),
    end: new Date(_year, 0, 8, 4, 40).toUTCString(),
    color: "yellow",
  },
  {
    id: "cxkl32nk",
    title: "Workshop A",
    start: new Date(_year, 0, 10, 10).toUTCString(),
    end: new Date(_year, 0, 10, 10, 45).toUTCString(),
  },
  {
    id: "cxmj32nlk",
    title: "Early Strategy Metting",
    start: new Date(_year, 0, 18, 9, 15).toUTCString(),
    end: new Date(_year, 0, 18, 10, 30).toUTCString(),
    color: "blue",
  },
  {
    id: " ds32k",
    title: "Training Session Mock",
    start: new Date(_year, 0, 20, 20, 45).toUTCString(),
    end: new Date(_year, 0, 21, 0, 30).toUTCString(),
    color: "blue",
  },
  {
    id: " l23232nk",
    title: "Conference A",
    start: new Date(_year, 0, 21, 20, 0).toUTCString(),
    end: new Date(_year, 0, 23, 3, 15).toUTCString(),
    color: "green",
  },
  {
    id: " cds32bk",
    title: "Board Meeting",
    start: new Date(_year, 0, 21, 4, 20).toUTCString(),
    end: new Date(_year, 0, 21, 5, 0).toUTCString(),
  },
  {
    id: " 323s32nlk",
    title: "Event Title",
    start: new Date(_year, 0, 21, 10, 0).toUTCString(),
    end: new Date(_year, 0, 21, 12, 30).toUTCString(),
    color: "yellow",
  },
  {
    id: " cxlk32",
    title: "Dummy Testing",
    start: new Date(_year, 0, 21, 12, 0).toUTCString(),
    end: new Date(_year, 0, 21, 15, 45).toUTCString(),
    color: "red",
  },
  {
    id: " ds78ds32",
    title: "Board Meeting",
    start: new Date(_year, 0, 30, 3, 15).toUTCString(),
    end: new Date(_year, 0, 30, 6, 30).toUTCString(),
    color: "orange",
  },

  {
    id: "ev41",
    title: "Team Breakfast",
    start: new Date(_year, _month || 5, 4, 3).toUTCString(),
    end: new Date(_year, _month || 5, 4, 5, 30).toUTCString(),
  },
  {
    id: "ev42",
    title: "Happy Hour",
    start: new Date(_year, _month || 5, 4, 7, 45).toUTCString(),
    end: new Date(_year, _month || 5, 5, 1, 15).toUTCString(),
    color: "red",
  },
  {
    id: "cxk",
    title: "Asia Market Review",
    start: new Date(_year, _month || 5, 8, 2).toUTCString(),
    end: new Date(_year, _month || 5, 8, 4, 40).toUTCString(),
    color: "yellow",
  },
  {
    id: "cxkl",
    title: "Workshop A",
    start: new Date(_year, _month || 5, 10, 10).toUTCString(),
    end: new Date(_year, _month || 5, 10, 10, 45).toUTCString(),
  },
  {
    id: "cxmj",
    title: "Early Strategy Metting",
    start: new Date(_year, _month || 5, 18, 9, 15).toUTCString(),
    end: new Date(_year, _month || 5, 18, 10, 30).toUTCString(),
    color: "blue",
  },
  {
    id: " ds",
    title: "Training Session Mock",
    start: new Date(_year, _month || 5, 20, 20, 45).toUTCString(),
    end: new Date(_year, _month || 5, 21, 0, 30).toUTCString(),
    color: "blue",
  },
  {
    id: " l232",
    title: "Conference A",
    start: new Date(_year, _month || 5, 21, 20, 0).toUTCString(),
    end: new Date(_year, _month || 5, 23, 3, 15).toUTCString(),
    color: "green",
  },
  {
    id: " cds",
    title: "Board Meeting",
    start: new Date(_year, _month || 5, 21, 4, 20).toUTCString(),
    end: new Date(_year, _month || 5, 21, 5, 0).toUTCString(),
  },
  {
    id: " 323s",
    title: "Event Title",
    start: new Date(_year, _month || 5, 21, 10, 0).toUTCString(),
    end: new Date(_year, _month || 5, 21, 12, 30).toUTCString(),
    color: "yellow",
  },
  {
    id: " cxlk",
    title: "Dummy Testing",
    start: new Date(_year, _month || 5, 21, 12, 0).toUTCString(),
    end: new Date(_year, _month || 5, 21, 15, 45).toUTCString(),
    color: "red",
  },
  {
    id: " ds78ds",
    title: "Board Meeting",
    start: new Date(_year, _month || 5, 30, 3, 15).toUTCString(),
    end: new Date(_year, _month || 5, 30, 6, 30).toUTCString(),
    color: "orange",
  },
];
