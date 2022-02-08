import React from 'react';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

export default function Flightdatalist({flightdata}) {

    const flightdatas = Array.from(flightdata);
    return (
        <div>
            {
                flightdatas.map((item) => {
                    let seatavail = item.seatAvailability > 0 ? item.seatAvailability : "No";
                    return (
                        <div key={item.id} style={{display: "flex", justifyContent: "space-evenly", columnGap: "4em", rowGap: "4em", margin: "15px 0"}}>
                            <span><FlightTakeoffIcon /></span>
                            <span>{item.origin} to {item.destination}</span>
                            <span>{item.departureDate} to {item.returnDate}</span>
                            <span>{item.amount} {item.currency}</span>
                            <span>{seatavail} Seats Available</span> 
                        </div>
                    )
                })
            }
            
        </div>
    )
}
