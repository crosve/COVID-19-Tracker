import React from 'react';
import numeral from 'numeral';
import './Table.css';


function Table({countries}){
    return(
        <div className="table">
            {/* we are destructing the countrie object and getting the country and cases */}
            {countries.map(({country, cases}) => (
                <tr>
                    <td>{country}</td>
                    <td>
                        <strong>{numeral(cases).format("0,0")}</strong>
                    </td>
                </tr>
            ))}
        </div>
    )

}

export default Table;