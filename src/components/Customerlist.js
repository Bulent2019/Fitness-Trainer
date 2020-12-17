import React, { useState, useEffect, useRef } from 'react';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Snackbar from '@material-ui/core/Snackbar';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


function Customerlist  () {
    const [customers, setCustomers] = useState([]);
    // const [training, setTraining] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getCustomers();
    }, [])

    const gridRef = useRef();

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    // const getTraining = () => {
    //     fetch('https://customerrest.herokuapp.com/gettrainings')
    //     .then(response => response.json())
    //     .then(data => setTraining(data))
    //     .catch(err => console.error(err))
    // }

    const addCustomer = (newCustomer) => {
        // setCustomers(['']);
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then(_ => getCustomers())
        .then(_ => {
                setMsg('Customer succesfully added')
                setOpen(true)
            })
        .catch(err => console.error(err))
    }

    
    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                "date": newTraining.date,
                "activity": newTraining.activity,
                "duration": newTraining.duration,
                "customer": newTraining.customer
            })
        })
        .then(_ => {
                setMsg('Training succesfully added')
                setOpen(true)
            })
        .catch(err => console.error(err))
    }


    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(_ => getCustomers())
        .then(_ => setMsg('Customer change succesfully'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }

    const deletCustomer = (link) => {
        console.log(link);
        if(window.confirm('You want to DELETE the Customer?')){
            fetch(link, {
                method: 'DELETE'
            })
            .then(_ => getCustomers())
            .then(_ => setMsg('Customer succesfully deleted'))
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
        }
    }

    const columns = [
        {headerName: 'Firstname',       field: 'firstname',     sortable: true, filter: true, floatingFilter: true, resizable: true},
        {headerName: 'Lastname',        field: 'lastname',      sortable: true, filter: true, floatingFilter: true, resizable: true},
        {headerName: 'Email',           field: 'email',         sortable: true, filter: true, floatingFilter: true, resizable: true},
        {headerName: 'Phone',           field: 'phone',         sortable: true, filter: true, floatingFilter: true, resizable: true},
        {headerName: 'Streetaddress',   field: 'streetaddress', sortable: true, filter: true, floatingFilter: true, resizable: true},
        {headerName: 'Postcode',        field: 'postcode',      sortable: true, filter: true, floatingFilter: true, resizable: true, width: 120},
        {headerName: 'City',            field: 'city',          sortable: true, filter: true, floatingFilter: true, resizable: true},
        {
            headerName: '',
            width: 60,            
            field: 'content',
            cellRendererFramework: params =>    <AddTraining 
                                                    addTraining={addTraining} 
                                                    params={params}/>
                                                // <EditIcon 
                                                //     aria-label="edit"
                                                //     onClick={() => deletCustomer(params.data.links[1].href)}>
                                                // </EditIcon>
        },
        {
            headerName: '',
            width: 60,            
            field: 'content',
            cellRendererFramework: params =>    <EditCustomer updateCustomer={updateCustomer} params={params}/>
                                                // <EditIcon 
                                                //     aria-label="edit"
                                                //     onClick={() => deletCustomer(params.data.links[1].href)}>
                                                // </EditIcon>
        },
        {
            headerName: '',
            width: 60,            
            field: 'content',
            cellRendererFramework: params =>    <IconButton 
                                                    aria-label="delete"
                                                    onClick={() => deletCustomer(params.data.links[1].href)}>
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
            <AddCustomer addCustomer={addCustomer}/>
            <div className="ag-theme-material" style={{height: '700px', width: '100%', margin: 'auto'}}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={ params => {
                        gridRef.current = params.api
                        params.api.sizeColumnsToFit();
                    }}
                    columnDefs={columns}
                    suppressCellSelection={true}
                    rowData={customers}
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

export default Customerlist;