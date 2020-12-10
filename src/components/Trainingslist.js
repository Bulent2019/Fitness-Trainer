import React, { useState, useEffect, useRef } from 'react';
import AddCustomer from './AddCustomer';

import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import Customerlist from './Customerlist';
import { getDateMeta, getDayClassNames } from '@fullcalendar/react';
import { _ } from 'ag-grid-community';


function Trainingslist  (props) {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    
    const [newD, setNewD] = useState('');
    const [n, setN] = useState({firstname: '', lastname: ''});

    useEffect(() => {
        getTrainings();
    }, [])

    const gridRef = useRef();

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {
            setTrainings(data)

            setNewD(moment(data[0].date, 'Do MMMM YYYY h:mm a'))
            // data.date = newD
            console.log(moment(data.date).format('Do MMMM YYYY h:mm a'))
            console.log(n)
        })
        .catch(err => console.error(err))
    }


    // const addCustomer = (newCustomer) => {
    //     fetch('https://customerrest.herokuapp.com/api/customers', {
    //         method: 'POST',
    //         headers: {'Content-type' : 'application/json'},
    //         body: JSON.stringify(newCustomer)
    //     })
    //     .then(_ => getCustomers())
    //     .then(_ => {
    //             setMsg('Customer succesfully added')
    //             setOpen(true)
    //         })
    //     .catch(err => console.error(err))
    // }

    const deletTrainings = (link) => {
        // if(window.confirm('You want to DELET the Training?')){
        //     fetch(link, {
        //         method: 'DELETE'
        //     })
        //     .then(_ => getTrainings())
        //     .then(_ => {
        //         setMsg('Training succesfully deleted')
        //         setOpen(true)
        //     })
        //     .catch(err => console.error(err))
        // }
    }

   

    const columns = [

        {headerName: 'Activity',        field: 'activity',             sortable: true, filter: true, floatingFilter: true, resizable: true},
        {headerName: 'Date',            field:'date',                  valueFormatter:params => (moment(params.value).format('Do MMMM YYYY h:mm a')),          sortable: true, filter: true, floatingFilter: true, resizable: true},       //setValue: ({date}) => {return moment(date, 'Do MMMM YYYY h:mm a')} ,
        {headerName: 'Duration / min',  field: 'duration',             sortable: true, filter: true, floatingFilter: true, resizable: true},
        {headerName: 'Customer',     valueGetter: params => (params.data.customer.firstname + " " + params.data.customer.lastname),                sortable: true, filter: true, floatingFilter: true, resizable: true},
        {
            headerName: '',
            width: 80,            
            resizable: true,
            cellRendererFramework: params =>    <IconButton 
                                                    aria-label="delete"
                                                    onClick={() => deletTrainings(params.id)}>
                                                    <DeleteIcon fontSize="small" color="secondary"/>
                                                </IconButton>
                                                // <Button 
                                                //     color="secondary" 
                                                //     size="small" 
                                                //     onClick={() => deletCustomer(params.data.links[1].href)}>
                                                //     Delete
                                                //  </Button>
        }
    ]

    const handleClose = () => {
        setOpen(false);
    }

    return(
        <div>
            {/* <AddCustomer addCustomer={addCustomer}/> */}
            <div className="ag-theme-material" style={{height: '700px', width: '100%', margin: 'auto'}}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={ params => {
                        gridRef.current = params.api
                        params.api.sizeColumnsToFit();
                    }}
                    columnDefs={columns}
                    suppressCellSelection={true}
                    rowData={trainings}
                    pagination={true}
                    paginationPageSize={10}
        
                >
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={msg}
                />
            </div>
        </div>
    )
}

export default Trainingslist;