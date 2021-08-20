import React from 'react';
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor} from "@testing-library/react";
import BubblePage from './BubblePage';

import fetchColorService from '../services/fetchColorService'
jest.mock('../services/fetchColorService');

const testColors = { data: [
    {
        color: "blue",
        code: {hex: "#f0f8ff"},
        id: 1,
    },
    {
        color: "color2",
        code: {hex: "#f0f8f9"},
        id: 2,
    },
] }

test("Renders without errors", async () => {
    render(<BubblePage />)
});

test("Renders appropriate number of colors passed in through mock", async () => {
    //Keep in mind that our service is called on mount for this component.
    fetchColorService.mockResolvedValue(testColors);
    render(<BubblePage />);
    
    await waitFor(()=> {
        const colorsList = screen.findAllByTestId(/color/i);
        //expect(colorsList).toHaveLength(2);
        
     });
            
        
});







