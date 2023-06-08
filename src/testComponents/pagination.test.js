import { render, fireEvent } from '@testing-library/react';
import Pagination from '../components/body/pagination';

test('renderiza correctamente los botones de paginación', () => {
  const handleNextPage = jest.fn();
  const handlePreviousPage = jest.fn();
  
  const { getByText } = render(
    <Pagination
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
    />
  );
  
  const previousButton = getByText('Anterior');
  const nextButton = getByText('Siguiente');
  
  expect(previousButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
  expect(previousButton).toHaveClass('btn btn-outline-success');
  expect(nextButton).toHaveClass('btn btn-outline-success');
});

test('llama a handleNextPage cuando se hace clic en el siguiente botón', () => {
  const handleNextPage = jest.fn();
  const handlePreviousPage = jest.fn();
  
  const { getByText } = render(
    <Pagination
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
    />
  );
  
  const nextButton = getByText('Siguiente');
  
  fireEvent.click(nextButton);
  
  expect(handleNextPage).toHaveBeenCalled();
});

test('llama a handlePreviousPage cuando se hace clic en el botón anterior', () => {
  const handleNextPage = jest.fn();
  const handlePreviousPage = jest.fn();
  
  const { getByText } = render(
    <Pagination
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
    />
  );
  
  const previousButton = getByText('Anterior');
  
  fireEvent.click(previousButton);
  
  expect(handlePreviousPage).toHaveBeenCalled();
});
