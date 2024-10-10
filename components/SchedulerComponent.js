'use client'

import React from 'react';
import { ScheduleComponent, Day, Week, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';

// Register Syncfusion license
registerLicense(process.env.REACT_APP_SYNCFUSION_LICENSE_KEY);

const SchedulerComponent = () => {
    const eventSettings = {
        dataSource: [
          {
            Id: 1,
            Subject: 'Team Meeting',
            StartTime: new Date(2024, 9, 6, 10, 0),
            EndTime: new Date(2024, 9, 6, 12, 0),
            CategoryColor: '#1aaa55', // green
          },
          {
            Id: 2,
            Subject: 'Conference',
            StartTime: new Date(2024, 9, 7, 9, 0),
            EndTime: new Date(2024, 9, 7, 10, 30),
            CategoryColor: '#f57b00', // orange
          },
          // Additional events...
        ],
    };

  return (
    <ScheduleComponent 
      height="650px" 
      eventSettings={eventSettings}
      selectedDate={new Date(2024, 9, 6)}
      currentView="Month"  // Default view set to Month
      views={['Day', 'Week', 'Month', 'Agenda']}  // Excluded Work Week view
    >
      <Inject services={[Day, Week, Month, Agenda]} />
    </ScheduleComponent>
  );
};

export default SchedulerComponent;
