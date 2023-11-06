import { createItems } from '../axiosApiCalls'
import api from '../axiosApi'

jest.mock('../axiosApi')

describe('createItems', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should call the API with the correct parameters', async () => {
    const mockedApiPost = api.post as jest.MockedFunction<typeof api.post>;
    const param1 = 'foo';
    const param2 = 'bar';
    const responseData = { success: true };

    // Mock the API response
    mockedApiPost.mockResolvedValueOnce({ data: responseData })

    // Call the function
    const result = await createItems(param1, param2)

    // Check that the API was called with the correct parameters
    expect(api.post).toHaveBeenCalledWith('/api/path', { param1, param2 })

    // Check that the function returned the correct data
    expect(result).toEqual(responseData)
  })

  it('should reject with an error if the API call fails', async () => {
    const mockedApiPost = api.post as jest.MockedFunction<typeof api.post>
    const error = new Error('API error')

    // Mock the API response to throw an error
    mockedApiPost.mockRejectedValueOnce(error)

    // Call the function and expect it to reject with the same error
    await expect(createItems('foo', 'bar')).rejects.toThrow(error)
  })
})