import React from 'react';
import './User.css';
import { useParams } from "react-router-dom"

function User() {
    const params = useParams();
    return (
    <div>
        Hi!
        {/* <h1> You must be user {params.id} </h1> */}
    </div>
    )
};

export default User;