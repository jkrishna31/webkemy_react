import { create } from "zustand";

import { CalendarEvent } from "@/lib/ui/elements/calendar";
import { forEachDateBetween } from "@/lib/utils/datetime.utils";

export interface SegregatedEvents {
  [key: string]: {
    [key: string]: {
      [key: string]: CalendarEvent[]
    }
  }
}

const ensurePath = (obj: any, path: (string | number)[]): any => {
  let curr = obj;
  for (const key of path) {
    if (!curr[key]) {
      curr[key] = {};
    }
    curr = curr[key];
  }
  return curr;
};

export const segregateEvents = (evts: CalendarEvent[]) => {
  const seggregatedEvts: {
    [key: string]: {
      [key: string]: {
        [key: string]: CalendarEvent[]
      }
    }
  } = {};
  evts.forEach((ev: CalendarEvent) => {
    if (ev.start && ev.end) {
      const startDate = new Date(ev.start);
      const sYear = startDate.getFullYear();
      const sMonth = startDate.getMonth();
      const sDay = startDate.getDate();
      const endDate = new Date(ev.end);
      const eYear = endDate.getFullYear();
      const eMonth = endDate.getMonth();
      const eDay = endDate.getDate();

      const sd = new Date(sYear, sMonth, sDay);
      const ed = new Date(eYear, eMonth, eDay);

      const startTargetArr = ensurePath(seggregatedEvts, [sYear, sMonth])[sDay] ||= [];
      const endTargetArr = ensurePath(seggregatedEvts, [eYear, eMonth])[eDay] ||= [];

      if (sd.toISOString() === ed.toISOString()) {
        startTargetArr.push(ev);
      } else {
        startTargetArr.push({ ...ev, end: undefined, ogEnd: ev.end });
        endTargetArr.push({ ...ev, start: undefined, ogStart: ev.start });
        forEachDateBetween(new Date(sYear, sMonth, sDay + 1), new Date(ed), (d) => {
          const y = d.getFullYear();
          const m = d.getMonth();
          const day = d.getDate();
          const targetArr = ensurePath(seggregatedEvts, [y, m])[day] ||= [];
          targetArr.push({ ...ev, start: undefined, end: undefined, ogStart: ev.start, ogEnd: ev.end });
        });
      }
    }
    // else event is recurring (and can have start date)
    // recurring - monthly, yearly, weekly, custom(from this to that date)
    // all day event
  });
  return seggregatedEvts;
};

export interface CalendarState {
  mode: "day" | "month" | "week" | "year"
  activeDay: number
  activeWeek: number
  activeMonth: number
  activeYear: number
  timeFormat?: "12h" | "24h"
  weekDayStart: 0 | 1
  selectedDateRange?: [number, number]
  events: CalendarEvent[]
  showOutsideDays?: boolean
  actions: {
    getSegregatedEvents: () => SegregatedEvents
    setField: (key: string, value: any) => void
    setStore: (payload: Partial<Exclude<CalendarState, "actions">>) => void
  }
}

const useCalendarStore = create<CalendarState>((set, get) => ({
  mode: "month",
  activeDay: new Date().getDate(),
  activeWeek: 0,
  activeMonth: new Date().getMonth(),
  activeYear: new Date().getFullYear(),
  weekDayStart: 0, // 0 - sunday, 1 - monday
  events: [],
  timeFormat: "12h",
  showOutsideDays: true,
  actions: {
    getSegregatedEvents: () => segregateEvents(get().events),
    setField: (key: string, value: any) => set(
      (state) => ({ ...state, [key]: value })
    ),
    setStore: (payload: Partial<Exclude<CalendarState, "actions">>) => set(
      (state) => ({ ...state, ...payload })
    ),
  }
}));

export const useCalendarActions = () => useCalendarStore(store => store.actions);

export const useActiveDay = () => useCalendarStore(state => state.activeDay);
export const useActiveWeek = () => useCalendarStore(state => state.activeWeek);
export const useActiveMonth = () => useCalendarStore(state => state.activeMonth);
export const useActiveYear = () => useCalendarStore(state => state.activeYear);
export const useCalendarMode = () => useCalendarStore(state => state.mode);
export const useSelectedDateRange = () => useCalendarStore(state => state.selectedDateRange);
export const useTimeFormat = () => useCalendarStore(state => state.timeFormat);
export const useWeekDayStart = () => useCalendarStore(state => state.weekDayStart);
export const useEvents = () => useCalendarStore(state => state.events);
export const useShowOutsideDays = () => useCalendarStore(state => state.showOutsideDays);
