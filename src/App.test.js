import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import App from "./App";
import { mount } from "enzyme";
import Addblog from "./pages/addblog"
import Listing from "./pages/listing";
import Description from "./page/description"
const Errorhandler = React.lazy(() => import("./pages/errorHandler"));
const value = {
  "kind": "blogger#post",
  "id": "111111111111111111",
  "published": "2007-03-07T13:23:00-08:00",
  "title": "AAA",
  "content": "AAA",
  "labels": ["AAA"],
  "label": ["AAA"],
  "author": {
    "displayName": "AAA",
  },
}
configure({ adapter: new Adapter() });
test("Default route should navigate to listing page", async () => {
  await Listing;
  await Errorhandler;
  await Addblog;
  const wrapper = await mount(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.contains(Listing)).toBe(true);
});

test("Routes with /add-blog should navigate to add blog form", async () => {
  await Listing;
  await Errorhandler;
  await Addblog;
  const wrapper = await mount(
    <MemoryRouter initialEntries={["/add-blog"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.contains(Addblog)).toBe(true);
});

test("Routers with unknown url should navigate to 404 page", async () => {
  await Listing;
  await Errorhandler;
  await Addblog;
  const wrapper = await mount(
    <MemoryRouter initialEntries={["/sddsdweq"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.contains(Errorhandler)).toBe(true);
});

test("Removes an item a blog from listing when delete button is pressed", async () => {
  const wrapper = await mount(
    <MemoryRouter initialEntries={["/"]}>
      <Listing />
    </MemoryRouter>
  );
  const initialCount = document.querySelectorAll('.MuiPaper-root.MuiPaper-elevation1.MuiCard-root').length;
  const deleteBtn = wrapper.find('.delete-button');
  deleteBtn.simulate("click");
  wrapper.update();
  const finalCount = document.querySelectorAll('.MuiPaper-root.MuiPaper-elevation1.MuiCard-root').length;
  expect(initialCount).toBeGreaterThan(finalCount)
});

test("Adds an item to the blog when submitted", async () => {
  wrapper.props.addBlog(value);
  const wrapper1 = await mount(
    <MemoryRouter initialEntries={["/add-blog"]}>
      <Listing />
    </MemoryRouter>
  );

  const initialLength = wrapper1.state().newblog.length;
  const wrapper = await mount(
    <MemoryRouter initialEntries={["/add-blog"]}>
      <Addblog />
    </MemoryRouter>
  );

  const finalLength = wrapper1.state().newblog.length;
  expect(initialLength).toBeGreaterThan(finalLength)
});

test("Renders the contents of shipping details page if the props are passed through", async () => {
  await Listing;
  await Errorhandler;
  await Description;

  const wrapper = await mount(
    <MemoryRouter>
      <Description row={value} />
    </MemoryRouter>
  );
  expect(wrapper.contains(".blog-details")).toBe(true);
});
