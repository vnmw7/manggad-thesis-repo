"use client"

import React from 'react';
import Navigation from "../_components/Navigation";
import Header from "../_components/Header";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


const card = (
    <React.Fragment>
        <CardContent>
            <h1> Book Title </h1>
            <p> Book Author </p>
            <p> Published Date </p>
        </CardContent>
        <CardActions>
            <Button size="small"> View Details </Button>
        </CardActions>
    </React.Fragment>
);

const Dashboard = () => {
	return (
		<div className="flex">
            <Navigation />

            <div className="grow h-[100vh] px-6">
                <div>
                    <Header />
                    <h1 className='mt-10'> Current Uploaded Books </h1>

                    {/* bookshelf */}
                    <div className='flex flex-col gap-2 md:grid md:grid-cols-3 lg:grid-cols-4'>
                        <Card variant="outlined">{card}</Card>
                        <Card variant="outlined">{card}</Card>
                        <Card variant="outlined">{card}</Card>
                        <Card variant="outlined">{card}</Card>
                        <Card variant="outlined">{card}</Card>
                        <Card variant="outlined">{card}</Card>
                        <Card variant="outlined">{card}</Card>
                        <Card variant="outlined">{card}</Card>
                        <Card variant="outlined">{card}</Card>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default Dashboard;