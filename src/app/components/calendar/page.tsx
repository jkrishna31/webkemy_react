"use client";

import React, { useEffect, useState } from "react";

import { EventForm } from "@/components/common/forms";
import { PageSetup } from "@/components/managers";
import { allEvents } from "@/data/dummy/calendarEvents";
import { useCalendarActions } from "@/data/stores";
import { CalendarBody, CalendarHeader, CalendarWrapper } from "@/lib/ui/elements/calendar";
import { Drawer, DrawerBody, DrawerHeader } from "@/lib/ui/elements/Drawer";
import CalendarPlusIcon from "@/lib/ui/svgs/icons/CalendarPlusIcon";

import styles from "./styles.module.scss";

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
            <DrawerHeader
              icon={<CalendarPlusIcon className={styles.form_icon} />}
              titleText="New Event" onClose={() => setShowEventForm(false)}
            />
            <DrawerBody>
              <EventForm onCancel={() => setShowEventForm(false)} />
            </DrawerBody>
          </Drawer>
        ) : null
      }
    </main>
  );
};

export default Page;
