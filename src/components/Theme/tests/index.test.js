import React from 'react';
import { render } from '@testing-library/react';
import Theme from '../index';
import { BrowserRouter as Router } from 'react-router-dom';

const children = <>Test</>;
const renderComponent = (props = {}) =>
    render(
        <Router>
            <Theme {...props}>
                {children}
            </Theme>
        </Router>,
    );

describe('<Theme />', () => {
    it('should have children', () => {
        const { container } = renderComponent();
        expect(container.children).toHaveLength(1);
    });
});