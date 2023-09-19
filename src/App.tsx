import { API } from 'aws-amplify';
import React, { useState } from 'react';

const myAPI = 'customersId';

type Customer = {
    customerId: string;
    customerName: string;
};

const App: React.FC = () => {
    const [input, setInput] = useState('');
    const [customers, setCustomers] = useState([] as Customer[]);
    const [error, setError] = useState('');

    //Function to fetch from our backend and update customers array
    function getCustomer(input: string) {
        const customerId = input;
        API.get(myAPI, `/customers/${customerId}`, {})
            .then((response: Customer) => {
                console.log(response);
                const newCustomers = [...customers];
                newCustomers.push(response);
                setCustomers(newCustomers);
                setError('');
            })
            .catch((error) => {
                console.log(error);
                setError(error.message);
            });
    }

    return (
        <div className='min-h-screen flex flex-col max-w-2xl items-center justify-center mx-auto'>
            <h1 className='text-4xl font-bold pb-12'>Amplify Demo App</h1>
            <div className='flex flex-col gap-4 pb-14'>
                <input
                    placeholder='customer id'
                    type='text'
                    value={input}
                    className='border border-gray-400 rounded-lg p-2'
                    onChange={(e) => setInput(e.target.value)}
                />

                <button
                    className='bg-blue-500 rounded-md text-white py-2 px-6'
                    onClick={() => getCustomer(input)}
                >
                    Get Customer From Backend
                </button>
            </div>

            {error && <p className='text-red-500'>{error}</p>}

            <h2 className={`text-2xl pb-6 ${customers.length > 0 ? 'visible' : 'invisible'}`}>
                Response
            </h2>
            {customers.map((thisCustomer, idx) => {
                return (
                    <div key={idx}>
                        <span>
                            <b>CustomerId:</b> {thisCustomer.customerId} - <b>CustomerName</b>:{' '}
                            {thisCustomer.customerName}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default App;
