import { renderHook, act } from '@testing-library/react-hooks';
import useFetchCharacters from '../api/apiListCharacters';

describe('useFetchCharacters', () => {
  const mockCharacters = [
    { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human' },
    { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human' }
  ];

  const mockData = {
    results: mockCharacters,
    info: { pages: 2 }
  };

  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    );
  });

  afterAll(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('buscar los datos de los personajes y devolverlos', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchCharacters(1, 'Earth', 'Rick')
    );

    expect(result.current.characters).toEqual([]);
    expect(result.current.totalPages).toEqual(1);

    await waitForNextUpdate();

    expect(result.current.characters).toEqual(mockCharacters);
    expect(result.current.totalPages).toEqual(2);
  });

  it('manejar los errores y registrarlos en la consola', async () => {
    const mockError = new Error('Fetch failed');

    global.fetch.mockImplementationOnce(() => Promise.reject(mockError));
    const consoleSpy = jest.spyOn(console, 'log');

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchCharacters(1, 'Earth', 'Rick')
    );

    expect(result.current.characters).toEqual([]);
    expect(result.current.totalPages).toEqual(1);

    await waitForNextUpdate();

    expect(result.current.characters).toEqual([]);
    expect(result.current.totalPages).toEqual(1);
    expect(consoleSpy).toHaveBeenCalledWith(mockError);
  });
});
