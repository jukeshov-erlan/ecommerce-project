import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import PaymentSummary from "./PaymentSummary";

vi.mock("axios");

describe("Payment Summary component", () => {
  let loadCart;
  let paymentSummary;
  let user;

  beforeEach(() => {
    paymentSummary = {
      totalItems: 2,
      productCostCents: 2180,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 2180,
      taxCents: 218,
      totalCostCents: 2398,
    };

    loadCart = vi.fn();

    user = userEvent.setup();
  });

  it("displays the correct details", () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );
    expect(
      screen.getByTestId("payment-summary-money-products")
    ).toHaveTextContent("$21.80");
    expect(
      screen.getByTestId("payment-summary-money-shipping-handling")
    ).toHaveTextContent("$0");

    expect(
      screen.getByTestId("payment-summary-money-before-tax")
    ).toHaveTextContent("$21.80");
    expect(screen.getByTestId("payment-summary-money-tax")).toHaveTextContent(
      "$2.18"
    );
    expect(screen.getByTestId("payment-summary-money-total")).toHaveTextContent(
      "$23.98"
    );
  });

  it('clicks the "Place Your Order" button', async () => {
    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    }
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>
    );
    const orderButton = screen.getByTestId("place-order-button");
    await user.click(orderButton);
    expect(axios.post).toHaveBeenCalledWith("/api/orders");
    expect(loadCart).toHaveBeenCalled();
    expect(screen.getByTestId("url-path")).toHaveTextContent("/order");
  });
});
