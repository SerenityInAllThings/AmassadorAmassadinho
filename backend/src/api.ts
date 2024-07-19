import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { getPlayerMatches, leoId } from "./dota";

export const getMatches = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { queryStringParameters } = event;
  const accountId = queryStringParameters?.playerId ?? leoId;

  const matches = await getPlayerMatches(accountId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      matches,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*.petersonv.click",
      "Access-Control-Allow-Methods": "GET",
      "Content-Type": "application/json",
    },
  };
};
