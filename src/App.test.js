import React from 'react';
import { configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from 'react-router';
import App from './App';
import { renderHook, act } from '@testing-library/react-hooks';
import { mount, shallow } from "enzyme";
import ShippingDetails from"./pages/shippingDetails";
import Listing from "./pages/listing";
const FourZeroFour = React.lazy(() => import("./pages/fourzerofour"));
afterEach(cleanup);
configure({ adapter: new Adapter() });
test('Default route should navigate to home page',async () => {
  await Listing;
  await FourZeroFour;
  await ShippingDetails;
  const wrapper = await mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.contains(Listing)).toBe(true)
});

test('Routers with /shipment should navigate to shipping details page',async () => {
  await Listing;
  await FourZeroFour;
  await ShippingDetails;
  const wrapper = await mount(
    <MemoryRouter initialEntries={[ '/shipment/S1001' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.contains(Listing)).toBe(true)
});

test('Shipping details page', () => {
  let value={id:"S1000"}
  const wrapper = shallow(<ShippingDetails row={value}/>).dive();
    const spyGetAllMarkers = jest.spyOn(wrapper.instance(), 'setupMap');
    wrapper.instance().componentDidMount();
    expect(spyGetAllMarkers).toHaveBeenCalled()
})

