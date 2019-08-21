import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import App from "./App";
import { mount } from "enzyme";
import ShippingDetails from "./pages/shippingDetails";
import Listing from "./pages/listing";
const FourZeroFour = React.lazy(() => import("./pages/fourzerofour"));

configure({ adapter: new Adapter() });
test("Default route should navigate to home page", async () => {
  await Listing;
  await FourZeroFour;
  await ShippingDetails;
  const wrapper = await mount(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.contains(Listing)).toBe(true);
});

test("Routers with /shipment should navigate to shipping details page", async () => {
  await Listing;
  await FourZeroFour;
  await ShippingDetails;
  const wrapper = await mount(
    <MemoryRouter initialEntries={["/shipment/S1001"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.contains(Listing)).toBe(true);
});

test("Routers with unknown url should navigate to 404 page", async () => {
  await Listing;
  await FourZeroFour;
  await ShippingDetails;
  const wrapper = await mount(
    <MemoryRouter initialEntries={["/sddsdweq"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.contains(FourZeroFour)).toBe(true);
});

test("Renders the contents of listing page when the data is fetched from server", async () => {
  const wrapper = await mount(
    <MemoryRouter initialEntries={["/sddsdweq"]}>
      <Listing />
    </MemoryRouter>
  );
  const editBtn = wrapper.find('[title="Edit"]');
  editBtn.simulate("click");
  wrapper.update();
  const nameField = wrapper.find('[value="T-shirts(Summer2018) from Shanghai to Hamburg"]');
  nameField.simulate("change", { target: { value: "Edit" } });
  wrapper.update();
  const saveBtn = wrapper.find('[title="save"]');
  saveBtn.simulate("click");
  wrapper.update();
  const changeFunction = jest.spyOn(wrapper.instance(), "handleRowChange");
  expect(changeFunction).toHaveBeenCalledWith(
    { name: "Edit" },
    { name: "T-shirts(Summer2018) from Shanghai to Hamburg" },
    "update"
  );
});

test("Renders the contents of listing page when the data is fetched from server", async () => {
  const wrapper = await mount(
    <MemoryRouter initialEntries={["/sddsdweq"]}>
      <Listing />
    </MemoryRouter>
  );
  const editBtn = wrapper.find('[title="Delete"]');
  editBtn.simulate("click");
  wrapper.update();
  const saveBtn = wrapper.find('[title="Save"]');
  saveBtn.simulate("click");
  wrapper.update();
  const changeFunction = jest.spyOn(wrapper.instance(), "handleRowChange");
  expect(changeFunction).toHaveBeenCalledWith(
    null,
    { id: "S1000" },
    "delete"
  );
});

test("Renders the contents of shipping details page if the props are passed through", async () => {
  await Listing;
  await FourZeroFour;
  await ShippingDetails;
  const value = {
    id: "S1000",
    name: "T-shirts(Summer2018) from Shanghai to Hamburg",
    cargo: [
      {
        type: "Fabric",
        description: "1000 Blue T-shirts",
        volume: "2"
      }
    ],
    mode: "sea",
    type: "FCL",
    destination: "Saarbrücker Str. 38, 10405 Berlin",
    origin: "Shanghai Port",
    services: [
      {
        type: "customs"
      }
    ],
    total: "1000",
    status: "ACTIVE",
    userId: "U1000"
  };
  const wrapper = await mount(
    <MemoryRouter>
      <ShippingDetails row={value} />
    </MemoryRouter>
  );
  expect(wrapper.contains(".shipping-details")).toBe(true);
});
