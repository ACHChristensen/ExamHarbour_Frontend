import { useEffect, useState } from "react";

export default function GetBoatsByHabour(habour, boatss) {
    let boats = {boat: {
        name:"",
        brand: "",
        make: 0,
        image:""
    }};
    boats = boatss;
    return (
        <div>
            <table className="table">
                <thead>
                    <h1>Både i {habour.name}</h1>
                    <tr>
                        <th className="col-ms-4" scope="col"></th>
                        <th className="col-ms-4" scope="col">Navn</th>
                        <th className="col-ms-4" scope="col">Mærke</th>
                        <th className="col-ms-4" scope="col">Lavet</th>
                        <th className="col-ms-4" scope="col">Billede</th>
                    </tr>
                </thead>
                <tbody>
                    {boats.map((boat) => { 
                        return(
                            <tr className="col-ms-4" scope="row">
                                <td></td>
                                <td>{boat.name}</td>
                                <td>{boat.brand}</td>
                                <td>{boat.made}</td>
                                <td>{boat.image}</td>
                            </tr>
                    ); })
                    }
                </tbody>
            </table>
        </div>
    );
}

export const habourSelect = {
    name: "",
        address: "",
        capacity: 0,
        boat: {
            name:"",
            brand: "",
            make: 0,
            image:"",
            harbour:this
        }
};

export function GetHabour(harbours) {
    let habours = [];
    let harbour = {
        name: "",
        address: "",
        capacity: 0,
        boat: {
            name:"",
            brand: "",
            make: 0,
            image:"",
            harbour:this
        }
    }

    const[habourSelected, setHabourSelected] = useState(harbour);

    habours = [...harbours];
    useEffect(() => {
        habours.array.forEach((habour) => {
            let habourSearched = habour.name.search(document.getElementById("search"));
            if (habourSearched === null) {
                habours.shift(habour);
            }
        });;
    });

    function refresh() {
        harbours = harbours.map();
    }
    document.addEventListener('button', GetBoatsByHabour);
    document.addEventListener('refresh', refresh);

    habourSelect = habourSelected;

    return (
        <div>
            <input type="text" id="search" placeholder="Navn på havn" />
            {habours.map((habour) => {
                <table className="table">
                    <thead>
                        <h1>Både i {habour.name}</h1>
                        <tr>
                            <th className="col-ms-4" scope="col"></th>
                            <th className="col-ms-4" scope="col">Navn</th>
                            <th className="col-ms-4" scope="col">Adresse</th>
                            <th className="col-ms-4" scope="col">Kapacitet</th>
                        </tr>
                    </thead>
                    <tbody>

                        return (
                        <tr className="col-ms-4" scope="row">
                            <td></td>
                            <td>{habour.name}</td>
                            <td>{habour.address}</td>
                            <td>{habour.capacity}</td>
                            <td><input type="button" id={habour.name}>Rediger</input></td>
                        </tr>
                        )
{setHabourSelected( habour)}
                    </tbody>

                </table>
            })}
            <td><input type="button" id="refresh">Refresh</input></td>
        
        </div>
    ) ;
}