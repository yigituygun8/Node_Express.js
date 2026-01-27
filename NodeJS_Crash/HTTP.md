Client and server communicate using HTTP protocol. HTTP is a stateless protocol, meaning each request from a client to server is treated as an independent transaction that is unrelated to any previous request.

HTTP Methods:
- GET: Retrieve data from the server.
- POST: Send data to the server to create a new resource.
- PUT: Update an existing resource on the server.
- DELETE: Remove a resource from the server.
- PATCH: Partially update an existing resource on the server.

HTTP Status Codes:
- 1xx: Informational responses (e.g., 100 Continue)
- 2xx: Successful responses (e.g., 200 OK, 201 Created)
- 3xx: Redirection messages (e.g., 301 Moved Permanently, 302 Found)
- 4xx: Client error responses (e.g., 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
- 5xx: Server error responses (e.g., 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout)

Headers:
HTTP headers are key-value pairs sent in requests and responses that provide additional information about the request or response. Common headers include Content-Type, Authorization, User-Agent, and Accept.

Statelessness:
HTTP is stateless, meaning each request is independent. Servers do not retain any information about previous requests. To maintain state (e.g., user sessions), mechanisms like cookies, sessions, or tokens are used.