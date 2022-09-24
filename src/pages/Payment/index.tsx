import React from 'react';
import {useQuery} from "../../helpers/query";

const Payment = () => {
    const query = useQuery();

    const waiterAuthToke = query.get("data");

    return (
        <div>
            {waiterAuthToke}
        </div>
    );
};

export default Payment;