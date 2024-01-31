// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC721 {
    function transferFrom(
        address from,
        address to,
        uint256 NFTId
    ) external;

    function ownerOf(uint256 tokenId) external view returns (address);
}

contract Auction {
    IERC721 public nftContract;
    uint256 public AuctionId;

    constructor(address _nftContract) {
        nftContract = IERC721(_nftContract);
    }

    receive() external payable {}

    struct Auction {
        uint256 nftId;
        address owner;
        uint256 startPrice;
        address higestbidder;
        uint256 higestbid;
        bool status;
        uint256 startDate;
        uint256 endDate;
    }

    mapping(uint256 => Auction) public AuctionNFTDetails;
    mapping(address => mapping(uint256 => uint256)) public balanceOfowner; // it should be private

    function ListNFT(
        uint256 nftId,
        uint256 startprice,
        uint256 endDateInsec
    ) public {
        require(
            nftContract.ownerOf(nftId) == msg.sender,
            "You are not the owner of this NFT"
        );
        require(
            block.timestamp + endDateInsec > block.timestamp,
            "End date should be greater than current time"
        );
        AuctionNFTDetails[AuctionId] = Auction(
            nftId,
            msg.sender,
            startprice,
            address(0),
            0,
            true,
            block.timestamp,
            block.timestamp + endDateInsec
        );
        AuctionId += 1;
    }

    function Bid(uint256 _AuctionId) public payable {
        require(
            AuctionNFTDetails[_AuctionId].owner != msg.sender,
            "Owner cannot bid own nft"
        );
        require(
            msg.value > AuctionNFTDetails[_AuctionId].higestbid,
            "Your bid should be greater than the highest bid."
        );
        require(
            AuctionNFTDetails[_AuctionId].higestbidder != msg.sender,
            "Your are the highest bidder, You can't bid again !"
        );
        AuctionNFTDetails[_AuctionId].higestbid = msg.value;
        AuctionNFTDetails[_AuctionId].higestbidder = msg.sender;
        balanceOfowner[msg.sender][_AuctionId] =
            balanceOfowner[msg.sender][_AuctionId] +
            msg.value;
    }

    function withdrawFunds(uint256 _AuctionId) public {
        require(
            AuctionNFTDetails[_AuctionId].higestbidder != msg.sender,
            "You are the highest bidder you can't withdraw"
        );
        payable(msg.sender).transfer(balanceOfowner[msg.sender][_AuctionId]);
        balanceOfowner[msg.sender][_AuctionId] = 0;
    }

    function completeAuction() public {}
}