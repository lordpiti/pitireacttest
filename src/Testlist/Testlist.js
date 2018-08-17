import React from 'react';

const testlist = ( props ) => {

    const calculateRandomAge = () => {
        return Math.round(Math.random()*100);
    }

    return (
        <div>
            test!!
            <ul>
            {
            props.personList.map((x, index) => 
                <li key={index} onClick={props.click.bind(this, index, calculateRandomAge())}>
                    {x.name} - {x.age}
                    <input onChange={props.change.bind(this, index)} value={x.name} />
                </li>)
            }
            </ul>
        </div>
    )
};

export default testlist;