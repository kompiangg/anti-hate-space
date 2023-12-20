function createSuccessResponse(payload, statusCode) {
  const body = {
    error: null,
    data: payload,
  };

  const response = new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    status: statusCode,
  });

  return response;
}

function createErrorResponse(error, statusCode) {
  const body = {
    error: error.message,
    data: null,
  };

  if (statusCode === 500) {
    console.error(error);
  }

  const response = new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    status: statusCode,
  });

  return response;
}

export { createSuccessResponse, createErrorResponse };
