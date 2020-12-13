import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { calendarFormat } from "moment";

function Full_Calendar (props) {

    // const [trainingEvents, setTrainingEvents] = ([]);

    // const openCalendar = () => {
    //     setTrainingEvents({
    //         title: props.params.data.firstname,
    //         date: props.params.data.date
    //     })
    // }


    const trainings = {title: "Test", date: new Date()};

    // const addToCalendar = (newTraining) => {
    // // setCustomers(['']);
    // console.log(newTraining)
    // fetch('https://customerrest.herokuapp.com/api/trainings', {
    //     method: 'POST',
    //     headers: {'Content-type' : 'application/json'},
    //     body: JSON.stringify(newTraining)
    // })
    // .then(_ => getCustomers())
    // .then(_ => {
    //         setMsg('Customer succesfully added')
    //         setOpen(true)
    //     })
    // .catch(err => console.error(err))
    // }



    // const getEvents = () => {
    //     fetch('https://customerrest.herokuapp.com/api/trainings')
    //     .then(response => response.json())
    //     .then(data => {
    //         setTrainingEvents(data.content)
    //         console.log(data)
    //         calendarFormat.getEvents(data.content)
    //     })
    //     .catch(err => console.error(err))
    // }

    return(
        <div>
            <h1></h1>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin]}
                headerToolbar={{
                    left: "prev,next, today",
                    center: "title",
                    right: "dayGridMonth, timeGridWeek, timeGridDay"
                }}
                editable={false}
                events={trainings}
                
                
                
                // locale="fin"
            />
        </div>
    )
}

export default Full_Calendar;