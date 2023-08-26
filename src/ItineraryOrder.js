import {
    BrowserRouter,
    Route,
    Routes,
    Link,
    useLocation
} from "react-router-dom";
import "./Style.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function ItineraryOrder() {


    const location = useLocation()
    const { itineraryOrderQuery } = location.state



    const url = "https://w1zn5oqsa5.execute-api.us-west-2.amazonaws.com/dev/itineraryretrieve?retrieveByAttribute=itineraryOrderId&id="
        + itineraryOrderQuery.itineraryOrderId
        + "&retrieveOperation=order";
    const [data, setData] = useState([]);


    const fetchInfo = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => setData(d))
    }


    useEffect(() => {
        fetchInfo();
    }, []);


    const navigate = useNavigate();

    
    return (

        <div className="App">

            <br></br>

            <h2>Customer Centric Itinerary Creation Engine</h2>

            <br></br>
            

            <h2>Itinerary Offer</h2>

            <br></br>

            {data.itinerary ?


                <div>
                    <table >
                        <tr>
                            <th>Itinerary Attirbute Name</th>
                            <th>Itinerary Attribute Value</th>
                        </tr>
                        {data.itinerary ? Object.entries(data.itinerary.itineraryOrders[0]).map(([key, value]) => (

                            <tr>
                                <td><strong>{
                                    key.replace(/([a-z])([A-Z])/g, '$1 $2')
                                }:</strong></td>
                                <td>{
                                    key == "customerId" ?
                                        <Link to="/ccice" state={ { customerId: value }}>
                                            {value}
                                        </Link>
                                        : JSON.stringify(value)
                                }
                                </td>
                            </tr>

                        )) : null}
                    </table>
                </div>
                : null}

            <br></br>


        </div>
    );
}

export default ItineraryOrder;