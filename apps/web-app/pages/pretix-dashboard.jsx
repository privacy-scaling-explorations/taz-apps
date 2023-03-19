import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [nameFilter, setNameFilter] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const fetchPretixEvents = async () => {
    try {
      const response = await fetch('/api/pretix-events');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.count);
        setTotalRegistrations(response.count);

        console.log(response.results);
        setEvents(data.results)
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPretixEvents();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Total Events</h2>
        <h1 className="text-4xl font-bold">{events.length}</h1>
      </div>
      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="px-2 w-full md:w-1/2 lg:w-1/3">
            <label htmlFor="name-filter" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <select multiple name="name-filter" id="name-filter" value={nameFilter} onChange={(e) => setNameFilter(Array.from(e.target.selectedOptions, option => option.value))} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm rounded-md">
              <option value="">All</option>
              {Array.from(new Set(events.map(event => event.name.en))).map((name, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="px-2 w-full md:w-1/2 lg:w-1/3">
            <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <div className="relative">
              <input type="text" name="date-filter" id="date-filter" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} onFocus={() => setShowCalendar(true)} onBlur={() => setShowCalendar(false)} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm rounded-md"/>
              {showCalendar && (
                <div                  className="absolute top-0 right-0 px-3 py-2 z-50 bg-white shadow-lg rounded-md"
                  style={{ minWidth: '17rem' }}
                >
                  <Calendar onChange={(date) => setDateFilter(date.toLocaleDateString())} value={dateFilter ? new Date(dateFilter) : new Date()} />
                </div>
              )}
            </div>
          </div>
          <div className="px-2 w-full md:w-1/2 lg:w-1/3">
            <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select multiple name="location-filter" id="location-filter" value={locationFilter} onChange={(e) => setLocationFilter(Array.from(e.target.selectedOptions, option => option.value))} className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm rounded-md">
              <option value="">All</option>
              {Array.from(new Set(events.map(event => event.location?.en))).map((location, index) => (
                <option key={index} value={location}>{location || 'N/A'}</option>
              ))}
            </select>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4">Event List</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.filter(event => (
                (nameFilter.length === 0 || nameFilter.includes(event.name.en)) &&
                (dateFilter.length === 0 || new Date(event.date_from).toLocaleDateString() === dateFilter) &&
                (locationFilter.length === 0 || locationFilter.includes(event.location?.en))
              )).map(event => (
              <tr key={event.slug}>
                <td className="px-4 py-2 whitespace-nowrap">{event.name.en}</td>
                <td className="px-4 py-2 whitespace-nowrap">{event.slug}</td>
                <td className="px-4 py-2 whitespace-nowrap">{new Date(event.date_from).toLocaleDateString()}</td>
                <td className="px-4 py-2 whitespace-nowrap">{event.location?.en || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="text-right">
                Showing {events.filter(event => (
                    (nameFilter.length === 0 || nameFilter.includes(event.name.en)) &&
                    (dateFilter.length === 0 || new Date(event.date_from).toLocaleDateString() === dateFilter) &&
                    (locationFilter.length === 0 || locationFilter.includes(event.location?.en))
                  )).length} out of {events.length} events
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
 
  );
}

export default Dashboard;


