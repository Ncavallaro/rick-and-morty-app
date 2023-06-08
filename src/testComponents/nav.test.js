import React from "react";
import { render } from "@testing-library/react";
import Nav from "../components/header/nav";

describe("Nav", () => {
  it("renderiza el componente sin errores", () => {
    render(<Nav />);
  });

  it("renderiza el logo correctamente", () => {
    const { getByAltText } = render(<Nav />);
    const logo = getByAltText("Logo");
    expect(logo).toBeInTheDocument();
    expect(logo.getAttribute("src")).toContain("logo1.png");
    expect(logo.getAttribute("width")).toBe("75");
    expect(logo.getAttribute("height")).toBe("75");
  });

  it("renderiza el título correctamente", () => {
    const { getByText } = render(<Nav />);
    const title = getByText("The Rick and Morty");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H1");
  });
});
