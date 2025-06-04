// Simple test script to check the API
const testAPI = async () => {
  try {
    console.log("Testing API connection...");

    // Test the connection endpoint
    const response = await fetch("http://localhost:3000/api/test-connection");
    const result = await response.json();

    console.log("Connection test result:", result);

    if (result.success) {
      // Test the books endpoint
      const booksResponse = await fetch("http://localhost:3000/api/books");
      const booksResult = await booksResponse.json();

      console.log("Books API result:", booksResult);
    }
  } catch (error) {
    console.error("Test failed:", error);
  }
};

// Run if server is available
testAPI();
