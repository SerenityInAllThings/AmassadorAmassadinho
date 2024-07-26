import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { getMatchesPerDay, getPlayerMatchesInAMonth, leoId } from "./dota";

export const getMatches = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { queryStringParameters } = event;
  const accountId = queryStringParameters?.playerId ?? leoId;
  const now = new Date();
  const month = queryStringParameters?.month
    ? parseInt(queryStringParameters?.month)
    : now.getMonth() + 1;
  const year = queryStringParameters?.year
    ? parseInt(queryStringParameters?.year)
    : now.getFullYear();

  const matches = await getPlayerMatchesInAMonth(accountId, year, month);
  const { matchesPerDay, totalMatches } = getMatchesPerDay(matches);

  return {
    statusCode: 200,
    body: JSON.stringify({ matchesPerDay, totalMatches, year, month }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Content-Type": "application/json",
    },
  };
};
