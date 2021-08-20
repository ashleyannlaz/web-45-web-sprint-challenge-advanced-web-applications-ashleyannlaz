import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

const blankColor = {
    color: '',
    code: {hex: ''},
    id: null,
}

const testColor = {
    color: 'coloration',
    code: {hex: '#h0h0h0'},
    id: 3,
}

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={blankColor} />);
});
  
test("Renders the color passed into component", () => {
    render(<Color color={testColor} />);
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const mockDelete = jest.fn();
    const mockToggleEdit = jest.fn();
    render(<Color color={testColor} deleteColor={mockDelete} toggleEdit={mockToggleEdit} />);
    const deleteButton = screen.getByTestId(/delete/i);
    userEvent.click(deleteButton);
    expect(mockToggleEdit).toHaveBeenCalled();
    expect(mockDelete).toHaveBeenCalled();

});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    const mockSetEditColor =  jest.fn()
    const mockToggleEdit = jest.fn()
    render(<Color color={testColor} setEditColor={mockSetEditColor} toggleEdit={mockToggleEdit}/>)
    const colorDiv = screen.getByTestId(/color/i)
    userEvent.click(colorDiv)
    const editMenu = screen.findByTestId(/edit_menu/i)
    expect(editMenu).toBeTruthy()
    expect(mockToggleEdit).toHaveBeenCalled()
    expect(mockSetEditColor).toHaveBeenCalled()
});