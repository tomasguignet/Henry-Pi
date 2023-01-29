import '@testing-library/jest-dom/extend-expect';
import Index from "./Index";



describe("Index component test", () => {
    test('Should render the page', () => { 
        const component = render(<Index/>)
        expect(component)
     })
})