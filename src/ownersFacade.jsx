import "react-bootstrap";
import "bootstrap";
import React, { useState, useEffect, onChange } from "react";
import { handleHttpErrors, URL_SERVER } from "./apiFacade";

const deafultOwner = [{
    address: "",
    name: "",
    phone: ""
}];

export default function GetAllOwnersUI(loggedIn) {

    const [owners, setOwners] = useState(deafultOwner);

    useEffect(() => {
        FetchingOwners(loggedIn);
    }, []);

    function FetchingOwners(loggedIn) {
        const options = makeOptions("GET", loggedIn);
        return fetch(URL_SERVER + "api/owners", options).then(handleHttpErrors).then((res) => setOwners(res));
    }
    const makeOptions = (method, addToken, body) => {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
        };
        if (body) {
            opts.body = JSON.stringify(body);

        }
        return opts;
    };

    if (!(owners.code == null)) {
        return (<div>
            <br /><br />
            <h1 className="alert">
                <div className="numberHTTP">{owners.code}</div>{owners.message}</h1>
        </div>)
    }
    return (
        <div>
            <table className="table">
                <thead>

                    <tr>
                        <th className="col-ms-4" scope="col"></th>
                        <th className="col-ms-4" scope="col">Navn</th>
                        <th className="col-ms-4" scope="col">Adresse</th>
                        <th className="col-ms-4" scope="col">Telefonnummer</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map((owner) => {
                        return (
                            <tr className="col-ms-4" scope="row">
                                <td></td>
                                <td>{owner.name}</td>
                                <td>{owner.address}</td>
                                <td>{owner.phone}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>

            </table>
        </div>

    );
}
