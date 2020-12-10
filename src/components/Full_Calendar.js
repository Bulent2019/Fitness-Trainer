import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

function Full_Calendar () {

    const trainings = [{title: "Test", date: new Date()}];

    const addCalendar = (trainings) => {
         fetch('https://customerrest.herokuapp.com/gettrainings',{ 
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(trainings)
        })
        .then(response => response.json())
        .then(data => {
            trainings.title = data[0].customer.firstname
            trainings.data = data[0].date
        })
    }

    return(
        <div>
            <h1></h1>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin]}
                events={trainings}
                headerToolbar={{
                    left: "prev,next, today",
                    center: "title",
                    right: "dayGridMonth, timeGridWeek, timeGridDay"
                }}
                editable={true}
                
                
                // locale="fin"
            />
        </div>
    )
}

export default Full_Calendar;