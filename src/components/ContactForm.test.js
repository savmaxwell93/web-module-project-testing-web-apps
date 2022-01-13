import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {findByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText(/Contact Form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    const firstNameField = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameField, "John");
    const errorMessage = await screen.findAllByTestId(/error/i);
    expect(errorMessage).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const button = screen.getByRole('button');
    userEvent.click(button);
    const errorMessage = await screen.findAllByTestId(/error/i);
    expect(errorMessage).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)
    const firstNameField = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameField, "Savannah");
    const lastNameField = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameField, "Maxwell");
    const button = screen.getByRole('button');
    userEvent.click(button);
    const errorMessage = await screen.findAllByTestId(/error/i);
    expect(errorMessage).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    const emailField = screen.getByLabelText(/email*/i);
    userEvent.type(emailField, "sav@email")
    const errorMessage = await screen.findByText(/email must be a valid email address/i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)
    const button = screen.getByRole('button');
    userEvent.click(button);
    const errorMessage = await screen.findByText(/lastName is a required field/i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    const firstNameField = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameField, "Savannah");
    const lastNameField = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameField, "Maxwell");
    const emailField = screen.getByLabelText(/email*/i);
    userEvent.type(emailField, "sav@email.com")
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(async () => {
        const firstNameDisplay = screen.queryByTestId(/firstnamedisplay/i);
        const lastNameDisplay = screen.queryByTestId(/lastnamedisplay/i);
        const emailDisplay = screen.queryByTestId(/emaildisplay/i);
        const messageDisplay = screen.queryByTestId(/messagedisplay/i);

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    const firstNameField = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameField, "Savannah");
    const lastNameField = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameField, "Maxwell");
    const emailField = screen.getByLabelText(/email*/i);
    userEvent.type(emailField, "sav@email.com");
    const messageField = screen.getByLabelText(/message/i);
    userEvent.type(messageField, 'hello there');
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(async () => {
        const firstNameDisplay = screen.queryByTestId(/firstnamedisplay/i);
        const lastNameDisplay = screen.queryByTestId(/lastnamedisplay/i);
        const emailDisplay = screen.queryByTestId(/emaildisplay/i);
        const messageDisplay = screen.queryByTestId(/messagedisplay/i);

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
    })
});