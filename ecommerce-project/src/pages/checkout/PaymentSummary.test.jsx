import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { vi } from "vitest";
import { PaymentSummary } from "./PaymentSummary";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from '@testing-library/user-event';
import axios from "axios";

vi.mock('axios');

describe("Payment Summary component", () => {
    let paymentSummary;
    let loadCart;
    let user;

    beforeEach(() => {
        loadCart = vi.fn();

        paymentSummary = {
            "totalItems": 5,
            "productCostCents": 6164,
            "shippingCostCents": 0,
            "totalCostBeforeTaxCents": 6164,
            "taxCents": 616,
            "totalCostCents": 6780
        };

        user = userEvent.setup();
    });

    it("displays payment summary correctly", () => {
        render(
            <MemoryRouter>
                <PaymentSummary
                    paymentSummary={paymentSummary}
                    loadCart={loadCart} />
            </MemoryRouter>
        );

        expect(
            screen.getByText('Items (5):')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('product-cost-row'))
                .getByText('$61.64')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('shipping-cost-row')
        ).toHaveTextContent('$0.00');

        expect(
            screen.getByTestId('cost-before-tax-row')
        ).toHaveTextContent('$61.64');

        expect(
            screen.getByTestId('tax-row')
        ).toHaveTextContent('$6.16');

        expect(
            screen.getByTestId('total-cost-row')
        ).toHaveTextContent('$67.80');
    });

    it('places an order', async () => {
        function Location() {
            const location = useLocation();

            return (
                <div data-testid="url-path">{location.pathname}</div>
            )
        };

        render(
            <MemoryRouter>
                <PaymentSummary
                    paymentSummary={paymentSummary}
                    loadCart={loadCart} />
                <Location />
            </MemoryRouter>
        );

        const placeOrderButton = screen.getByTestId('place-order-button');
        await user.click(placeOrderButton);

        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalled();

        expect(
            screen.getByTestId('url-path')
        ).toHaveTextContent('/orders');

    });
});