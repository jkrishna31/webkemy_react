"use client";

import { useEffect, useState } from "react";

import { EventForm } from "@/components/common/forms";
import { PageSetup } from "@/components/managers";
import { allEvents } from "@/data/dummy/calendarEvents";
import { useCalendarActions } from "@/data/stores";
import { CalendarBody, CalendarHeader, CalendarWrapper } from "@/lib/components/elements/calendar";
import { Drawer } from "@/lib/components/elements/drawer";
import CalendarPlusIcon from "@/lib/svgs/icons/CalendarPlusIcon";

import styles from "./page.module.scss";

const Page = () => {
  const [showEventForm, setShowEventForm] = useState(false);

  const { setField } = useCalendarActions();

  useEffect(() => {
    setField("events", allEvents);
  }, [setField]);

  return (
    <main className={styles.main}>
      <PageSetup pageKey="calendar" />

      <CalendarWrapper>
        <CalendarHeader className="py-[1.6rem]" />
        <CalendarBody
          onAdd={() => setShowEventForm(true)}
        />
      </CalendarWrapper>

      {
        showEventForm ? (
          <Drawer
            open={showEventForm} onClose={() => setShowEventForm(false)} aria-label="New Event"
          >
            <Drawer.Header
              icon={<CalendarPlusIcon className={styles.form_icon} />}
              title="New Event" onClose={() => setShowEventForm(false)}
            />
            <Drawer.Body>
              <EventForm onCancel={() => setShowEventForm(false)} />
            </Drawer.Body>
          </Drawer>
        ) : null
      }
    </main>
  );
};

export default Page;
