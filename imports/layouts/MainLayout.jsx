import React from 'react';


import { Navigation } from '../components/Navigation.jsx';

export const MainLayout = ({ children }) => (
    <div className="container">
        <div className="masthead">
            <h3 className="text-muted">Conference title</h3>
            <Navigation />
            { children }
        </div>
    </div>
);
