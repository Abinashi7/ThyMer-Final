# Therapy Manager

## Summary

Therapy manager is the final project for the course Foundations of Software Engineering. It aims to create a website for therapists to keep track of their patients, book apointments and more. 

Therapy Manager allows mental health professionals to organize  appointments and keep track of their patients through patient profiles. Each patient profile contains patient demographic information, medication usage, previous/current diagnoses, and previous/future appointments. Clicking on an appointment brings up a notepad component that allows health professionals to view and edit notes for that appointment. Additionally, users will be able to upload other relevant patient documents such as blood and urine reports, hospital records, and results from physicals.

The project website can be found at: https://pages.github.ccs.neu.edu/2020SPCS5500SV/project-ThyMer/

## Project Structure

This repository is divided as following:

+ docs:

   Contains the documentation for the project as well as the GitHub pages.
   It also contains the Communication plan, a prototype, the backend API specification, and the database specification.
   
+ frontend:

   Contains all the source files for the frontend.
   
+ backend:

   Contains all the source files for the backend.
## User story
Therapy Manager is designed for professionals in the mental health field (therapists, psychiatrists, etc.) with the purpose of consolidating patient information in an accessible and intuitive manner. We hope this app will assist the often overworked mental health professionals by providing them with a platform to organize their appointments, patient information, and notes in a single location. The following is a potential use story for a fictional user named Sarah to help illustrate how the app will be used.

Sarah logs into Therapy Manager and sees her appointments for the day on the calendar displayed on the home page. Her first appointment is a man who she hasn't seen in a couple of months. She sees that the reason for his appointment is a reoccurrence of depressive symptoms. Sarah clicks on the man's patient profile to freshen her memory of the man. She sees that he has suffered from depressive episodes and Generalized Anxiety Disorder and that he has been treated with SSRI's in the past but is currently only taking Lexapro. She recalls having some difficulty convincing him to continue taking his medication and she navigates to previous appointments she'd had with the man to check her notes and confirm her memory. While checking her notes, she is reminded that the man was having troubles with his family a few months ago and she navigates to the current appointment tab to make a note to herself to bring that up during the appointment. During the appointment, Sarah takes notes on the new events in the man's life and the symptoms he has been experiencing. At the end of the appointment, she refreshes his Lexapro prescription, adds the new prescription to his profile, and checks her calendar for the next appointment.

## How to run

Make sure to have all the dependenencies installed (if not, do run `npm install` on both backend and frontend folders).

To run the backend: in the backend folder run `npm run dev`
To run the frontend: in the frontend folder run `npm start`
