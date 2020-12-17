import React, {useState, useEffect, useRef} from "react";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ContactsOutlined } from "@material-ui/icons";

function Full_Calendar (props) {

    const [events, setEvents] = useState ([]);
    const [training, setTraining] = useState({});

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {
            setTraining(data)
            const all = data.length

            // for(let i = 0; i < all; i++){
            //     setTraining({...training,
            //             date: training[i].date,
            //             title: training[i].activity + " / " + training[i].customer.firstname + " " + training[i].customer.lastname
            //       })
            // }
        })
        .catch(err => console.error(err))
    }

    return (
        <div>
            <h1></h1>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                headerToolbar={{
                    left: "prev,next, today",
                    center: "title",
                    right: "dayGridMonth, timeGridWeek, timeGridDay",
                }}
                editable={true}
                events={training}
                // locale="fin"
                selectable={true}
            />
        </div>
    )
}
export default Full_Calendar;