import axios from "axios";

export async function getBiddingList(params: {
  campaignid: number;
  url: string;
  clickid: number;
  domain: string;
}): Promise<{
  payout: number;
  url: string;
} | null> {
  const { campaignid, url, clickid, domain } = params;
  const response = await axios.get(
    `https://e311dw00w9.execute-api.us-east-1.amazonaws.com/production/auction?campaignid=${campaignid}&
            url=${url}&clickid=${clickid}&domain=${domain}`
  );

  if (response?.data) {
    return response.data;
  } else {
    // If response from advertiser is empty return null
    return null;
  }
}

module.exports = { getBiddingList };
