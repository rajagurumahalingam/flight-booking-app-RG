import React from 'react';
import ReactDOM from "react-dom";
import { Button, TextField } from "@material-ui/core";
import {useForm} from "react-hook-form";
import Select from '@material-ui/core/Select';
import { MenuItem, FormControl, InputLabel } from '@material-ui/core';

const Flightsearch = (props) => {

    const flightschema = ({
        origin: "",
        destination: "",
        departuredate: "",
        returndate: "",
        servicetype: ""
      });

    const { handleSubmit, register, reset, control, errors, setValue } = useForm({flightschema});
    const servicetype = ['', 'amadeusExactMatch', 'amadeusOptimizedPrice', 'amadeusBestPrice', 'amadeusOptimizedBestPrice'];

    const clearfilters = () => {
        props.clearfilter();
        reset(flightschema);
    }

    const onSubmit = data => {
        console.log("Submitted data", data);
        props.handlesearchdata(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} style={{margin: "auto"}}>
                
                <TextField
                    name="origin"
                    label="Origin"
                    type="text"
                    {...register('origin', { required: true })}
                    fullWidth
                />
                <TextField
                    name="destination"
                    label="Destination"
                    {...register('destination', { required: true })}
                    type="text"
                    fullWidth
                />
                <TextField
                    name="departuredate"
                    label="Departure Date"
                    type="date"
                    variant="filled"
                    {...register('departuredate', { required: true })}
                    fullWidth
                />
                <TextField
                    name="returndate"
                    label="Return Date"
                    variant="filled"
                    type="date"
                    {...register('returndate', { required: true })}
                    fullWidth
                />

                <FormControl fullWidth>
                <InputLabel>servicetype</InputLabel>
                <Select name="servicetype" defaultValue=""
                    {...register("servicetype", { required: true })}
                    onChange={e => setValue("servicetype", e.target.value)}>
                    {servicetype.map((value,index) => (
                    <MenuItem key={index} value={value}>
                        {value} 
                    </MenuItem>
                    ))}
                    </Select>
                </FormControl>

                <Button color="primary" type="submit" variant="contained" style={{marginTop: "20px"}} fullWidth>
                   Search
                </Button>
                <Button color="primary" onClick={clearfilters} variant="contained" style={{marginTop: "20px"}} fullWidth>
                   Clear Filter
                </Button>
            </form>
        </div>
    )
}

export default Flightsearch;
