const {expect} = require("chai");
const {ethers} = require("hardhat");
const {utils} = require('ethers');
let dev, user, none, devAddress, userAddress, noneAddress;
let NFT, main, token;
const ONE = toWei('1'), TWO= toWei('2'), THREE = toWei('3'), TEN = toWei('10');

function toWei(v) {
    return utils.parseUnits(v, 18).toString();
}

function fromWei(v) {
    return utils.formatUnits(v, 18).toString();
}

describe("main", function () {
    beforeEach(async () => {

        [dev, user, none] = await ethers.getSigners();
        devAddress = dev.address,
            userAddress = user.address,
            noneAddress = none.address;

        const _NFT = await ethers.getContractFactory("SampleNFT");
        const _main = await ethers.getContractFactory("main");
        const _token = await ethers.getContractFactory("Token");

        token = await _token.deploy("test", "test");
        NFT = await _NFT.deploy("http://localhost/");
        await NFT.deployed();

        main = await _main.deploy(token.address);
        await main.deployed();

        await token.mint(noneAddress, TEN);

    });


    it("addNftToAuction+setAuction+cancelAuction", async function () {

        const start = (await main.getTimestamp()).toString();
        const end = parseInt(start) + 3600;

        await NFT.mint(userAddress, noneAddress);
        await NFT.mint(userAddress, noneAddress);
        await NFT.mint(userAddress, noneAddress);
        await NFT.mint(userAddress, noneAddress);
        await NFT.mint(userAddress, noneAddress);

        await NFT.connect(user).setApprovalForAll(main.address, true);
        await token.connect(user).approve(main.address, TEN);
        await token.connect(dev).approve(main.address, TEN);
        await token.connect(none).approve(main.address, TEN);

        await main.connect(user).addAuction(NFT.address, '1', ONE, start, end, 1000);

        // 1 is not valid, next bid should be 1.1
        let auctionNextPrice = await main.auctionNextPrice('0', ONE); // 1
        expect(auctionNextPrice.offeredIsValid).to.be.eq(false);

        // 2 is valid
        auctionNextPrice = await main.auctionNextPrice('0', TWO);
        expect(auctionNextPrice.offeredIsValid).to.be.eq(true);

        await main.bid('0', TWO);

        await network.provider.send("evm_increaseTime", [3600])
        await network.provider.send("evm_mine")

        await main.connect(none).bid('0', THREE);

        const userBalance = (await token.balanceOf(userAddress)).toString();
        expect(userBalance).to.be.eq(THREE);

        expect(await NFT.ownerOf('1')).to.equal(noneAddress);

    });

    /*
    it("addNftToAuction+setAuction+cancelAuction", async function () {
        const start = (await main.getTimestamp()).toString();
        const end = parseInt(start) + 3600;
        await NFT.mint(userAddress, noneAddress);
        await NFT.mint(userAddress, noneAddress);
        await NFT.mint(userAddress, noneAddress);
        await NFT.mint(userAddress, noneAddress);
        await NFT.mint(userAddress, noneAddress);

        await NFT.connect(user).setApprovalForAll(main.address, true);

        await main.connect(user).addAuction(NFT.address, '1', ONE, start, end, 0);
        await main.connect(user).addAuction(NFT.address, '2', ONE, start, end, 0);
        await main.connect(user).addAuction(NFT.address, '3', ONE, start, end, 0);
        await main.connect(user).addAuction(NFT.address, '4', ONE, start, end, 0);
        await main.connect(user).addAuction(NFT.address, '5', ONE, start, end, 0);

        expect(await NFT.ownerOf('1')).to.equal(main.address);
        await main.connect(user).setAuction('0', TWO, start, end, 0);
        await main.connect(user).cancelAuction('0');
        expect(await NFT.ownerOf('1')).to.equal(userAddress);
        ;

    });
    */


    /**
     it("mint test", async function () {
        await NFT.mint(userAddress, noneAddress);
        expect(await NFT.exists('1')).to.equal(true);
        expect(await NFT.ownerOf('1')).to.equal(userAddress);

        await NFT.mint(userAddress, noneAddress);
        expect(await NFT.exists('2')).to.equal(true);
        expect(await NFT.ownerOf('2')).to.equal(userAddress);

        await NFT.mint(userAddress, noneAddress);
        expect(await NFT.exists('3')).to.equal(true);
        expect(await NFT.ownerOf('3')).to.equal(userAddress);

        expect( (await NFT.tokenIdPointer()).toString()).to.equal('3');

        await NFT.mint(devAddress, noneAddress);
        await NFT.mint(devAddress, noneAddress);
        await NFT.mint(devAddress, noneAddress);
        await NFT.mint(devAddress, noneAddress);
        await NFT.mint(devAddress, noneAddress);
        await NFT.mint(devAddress, noneAddress);
        await NFT.mint(devAddress, noneAddress);

        expect( (await NFT.tokenIdPointer()).toString()).to.equal('10');


        await NFT.mint(userAddress, userAddress);
        await NFT.mint(userAddress, userAddress);
        await NFT.mint(userAddress, userAddress);
        await NFT.mint(userAddress, userAddress);
        await NFT.mint(userAddress, userAddress);


    });

     */
});
