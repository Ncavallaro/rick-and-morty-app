import { renderHook, act } from '@testing-library/react-hooks';
import useFetchCharacter from '../api/apiCharacters';

describe('useFetchCharacter', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: {
      name: 'Earth'
    },
    location: {
      name: 'Earth'
    }
  };

  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCharacter)
      })
    );
  });

  afterAll(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('buscar los datos del personaje y devolverlo', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchCharacter(1));

    expect(result.current).toBeNull();

    await waitForNextUpdate();

    expect(result.current).toEqual(mockCharacter);
  });

  it('manejar los errores y registrarlos en la consola', async () => {
    const mockError = new Error('Fetch failed');

    global.fetch.mockImplementationOnce(() => Promise.reject(mockError));
    const consoleSpy = jest.spyOn(console, 'log');

    const { result, waitForNextUpdate } = renderHook(() => useFetchCharacter(1));

    expect(result.current).toBeNull();

    await waitForNextUpdate();

    expect(result.current).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(mockError);
  });
});
