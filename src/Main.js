import React, { useEffect, useState } from "react";
import axios from "axios";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import logo from "./globe-logo.svg";

export default function Main() {
  const [coviddata, setcoviddata] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.covid19api.com/summary")
      .then((res) => {
        console.log(res.data);
        setcoviddata(res.data.Countries);
      })
      .catch((err) => {
        console.log(err);
      });

    $(document).ready(() => {
      $("#mytable").DataTable();
    });
  }, [coviddata]);

  const tabledata = coviddata.map((obj) => {
    return (
      <tr>
        <td>{obj.Country}</td>
        <td>{obj.TotalConfirmed}</td>
        <td>{obj.TotalConfirmed - obj.TotalRecovered}</td>
        <td>{obj.TotalRecovered}</td>
        <td>{obj.TotalDeaths}</td>
      </tr>
    );
  });

  return (
    <div>
      <h1 className="ddd">
        <img src={logo} className="globe-logo" alt="logo" />
        CovidStats
      </h1>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <table id="mytable" className="table table-dark">
            <thead>
              <tr>
                <th>Country </th>
                <th>Confirmed</th>
                <th>Active</th>
                <th>Recovered</th>
                <th>Deaths</th>
              </tr>
            </thead>
            <tbody>{tabledata}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
