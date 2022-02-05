# Cronos NFT Public Auction Service

## About

This is a contract that offer public nft auction service to anyone.

## How it works

### Adding a nft to auction

Seller use `addAuction` with following arguments to post a nft for auction:
```javascript
address nft: the nft contract address.
uint tokenId: the nft token id number.
uint minBid: min price in wei.
uint start: unix timestamp when auction starts.
uint end: unix timestamp when auction ends.
uint priceStep: % price increment, ex: 1000 for 10% increment or 500 for 5% increment.
```

### Biding to a nft

Call `bid` with auction id and bid price in wei to put a bid to a nft. 

The last bid after `end` timestamp passed will win the auction.

# Technical Implementation

The contract operate in public mode, ie, anyone can add nft to auction and anyone can bid.

For frontend dev that want to implement a frontend to this contract, follow this steps:


### addAuction

Use `addAuction` to add a new nft.

`addAuction(address nft, uint tokenId, uint minBid, uint start, uint end, uint priceStep)`

```javascript
address nft: the nft contract address.
uint tokenId: the nft token id number.
uint minBid: min price in wei.
uint start: unix timestamp when auction starts.
uint end: unix timestamp when auction ends.
uint priceStep: % price increment, ex: 1000 for 10% increment or 500 for 5% increment.
```

Call this function to add a new nft to auction system.
Note: you must approve the contract to transfer the nft from user. For this, call `setApprovalForAll`.


### setAuction

Use `setAuction` to change auction parameters. 

`setAuction(uint id, uint minBid, uint start, uint end, uint priceStep)`
```javascript
uint id: the acution id.
uint minBid: min price in wei.
uint start: unix timestamp when auction starts.
uint end: unix timestamp when auction ends.
uint priceStep: % price increment, ex: 1000 for 10% increment or 500 for 5% increment.
```

### getListOfNftContracts

Use to know the list of all nft auction contracts. 
The list contains only active contracts with auctions.

### getListOfNftIdByContract

Use to get a list of all nft id numbers by a nft contract.
The list contains only active contracts with auctions.

### getListOfAuctionIdByContract 

Use to get a list of auction id numbers by a nft contract.

### getAuctionById

Use to get all information about a auction by id.

### cancelAuction

Use to cancel an auction before it ends.

### setAuctionPayment

Allow user or admin to set a different token for nft payment.
