import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
import Index from "./Index";
import { BrowserRouter } from "react-router-dom";
import Home from './../Home/Home';
import { Provider } from 'react-redux';
import store from './../../redux/store';



describe("Index component test", () => {
    test('Should render the page', () => { 
        render(<BrowserRouter><Index/></BrowserRouter>);
        const element = screen.getByText(/Lets see whats inside!/i); 
        expect(element).toBeInTheDocument();
     });

     test("Should render the Home component", () => {
        render(<BrowserRouter><Index/></BrowserRouter>);
        const button = screen.getByText(/Start/i);
        userEvent.click(button);
        expect(render(<BrowserRouter><Provider store={store}><Home/></Provider></BrowserRouter>))
     })
})