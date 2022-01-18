import express, { Request, Response, Router } from "express";
import { getBiddingList } from "../services/auction.service";
import { getDomainFromUrl } from "../utils/domain";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    // Destructuring query string parameters
    const { campaignid, url, clickid } = req.query;

    parseInt;
    // Making 4 calls to the fake advertiser
    const listOfBiddings = await Promise.all(
      [1, 1, 1, 1].map((item) =>
        getBiddingList({
          campaignid: Number(campaignid),
          url: String(url),
          clickid: Number(clickid),
          domain: getDomainFromUrl(String(url)),
        })
      )
    );

    // Filltering out all the empty responses from the fake advertiser
    const validResults = listOfBiddings.filter(
      (i): i is { payout: number; url: string } => {
        return i !== null;
      }
    );

    if (validResults.length === 0) {
      res.status(204).send("no content HTTP code 204");
    }

    let highestBid = 0;
    let highestBidIndex = 0;

    // Finiding the highest bidder
    validResults.forEach((result, index) => {
      if (result.payout > highestBid) {
        highestBid = result.payout;
        highestBidIndex = index;
      }
    });

    console.log(typeof validResults[highestBidIndex].url);

    // res.status(200).send({
    //   highestBid,
    //   highestBidUrl: validResults[highestBidIndex].url,
    //   listOfBiddings,
    // });

    // Log the highest bidder payout & url
    console.log({
      highestBid: highestBid,
      highestBidUrl: validResults[highestBidIndex].url,
    });

    res.status(200).redirect(validResults[highestBidIndex].url);
  } catch (e) {
    console.log("#######", e);
    res.status(500).send("Error code 500");
  }
});

export default router;
