import React, { useState, useEffect } from 'react';
import moment from 'moment';

function Modal({ showModal, setShowModal, body }) {
  return showModal ? (
    <div className='bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-md'>
        <div className='justify-between items-center flex flex-row mb-6'>
          <h2 className='text-2xl text-bold'>Event Details</h2>
          <span
            className='hover:cursor-pointer'
            onClick={() => setShowModal(false)}
          >
            X
          </span>
        </div>

        <p className='whitespace-pre'>{body || 'No body available.'}</p>
      </div>
    </div>
  ) : (
    <span />
  );
}

const data = require('../data/frontend-log-sample.json');

export default function Events() {
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState();

  const toggleModal = (body) => {
    setShowModal(!showModal);
    setItem(body);
  };

  return (
    <div className='flex flex-col max-h-screen overflow-scroll mx-10 border-2 rounded-lg'>
      <Modal setShowModal={setShowModal} showModal={showModal} body={item} />
      <table className='mx-4 mt-2'>
        <thead>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              User
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Subject
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Date
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Body
            </th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {data.map((item) => {
            return (
              <tr
                key={item.id}
                className={
                  item.type === '1'
                    ? 'bg-green-100' +
                      ' hover:shadow-md border-b-2 border-green-200 hover:cursor-pointer hover:bg-green-200'
                    : item.type === '2'
                    ? 'bg-yellow-2' +
                      ' hover:shadow-md border-b-2 border-yellow-200 hover:cursor-pointer hover:bg-yellow-200'
                    : 'bg-red-100' +
                      ' hover:shadow-md border-b-2 border-red-200 hover:cursor-pointer hover:bg-red-200'
                }
                onClick={() => toggleModal(item.body)}
              >
                <td className='px-6 py-4 text-sm leading-5 text-gray-500'>
                  {item.user_id}
                </td>
                <td className='px-6 py-4 text-sm leading-5 font-medium text-gray-900'>
                  {item.subject || 'Empty subject'}
                </td>
                <td className='px-6 py-4 text-sm leading-5 text-gray-500 max-w-xs truncate'>
                  {moment(item.created).format('LLL') || 'Empty date'}
                </td>
                <td className='px-6 py-4 text-sm leading-5 text-gray-500 max-w-xs truncate'>
                  {item.body || 'Empty body'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
