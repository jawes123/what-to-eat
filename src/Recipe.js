import {useLocation} from 'react-router-dom';
import React, { useEffect, useState } from "react";

const Record = (props) => (
    <tr>
      <td>{props.record.name}</td>
      <td>{props.record.description}</td>
      <td>{props.record.ingredients}</td>
      <td>
      </td>
    </tr>
   );

function Recipe() {
    
    const [records, setRecords] = useState([]);

    useEffect(() => {
    async function getRecords() {
        const response = await fetch(`http://localhost:5050/record/`);
    
        if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
        }
    
        const records = await response.json();
        setRecords(records);
    }
    
    getRecords();
    
    return;
    }, [records.length]);

    function recordList(){
        return records.map((record) => {
            return (
              <Record/>
            );
        });
    }

    //const location = useLocation();
    return (
        <div>
            {recordList()}
        </div>

    );
  };
  
  export default Recipe;