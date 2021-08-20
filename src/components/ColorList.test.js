import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, } from "@testing-library/react";
import ColorList from './ColorList';

const testColors = [
    {
        color: "alice blue",
        code: {hex: "#f0f8ff"},
        id: 1,
    }
]

test("Renders an empty list of colors without errors", async () => {
    render(<ColorList colors={[]} />)
});

test("Renders a list of colors without errors", async () => {
    render(<ColorList colors={testColors} />)
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", async () => {
    const { rerender } = render(<ColorList colors={testColors} editing={true}/>)
    let editForm = screen.queryByTestId(/edit_menu/i)
    expect(editForm).toBeInTheDocument()
    rerender(<ColorList colors={testColors} editing={false}/>)
    expect(editForm).not.toBeInTheDocument()

});
