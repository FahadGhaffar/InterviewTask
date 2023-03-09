class CustomAPIError extends Error {
  constructor(message) {
    super(message)
  }
}

export default CustomAPIError;
// module.exports = CustomAPIError
