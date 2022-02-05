// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SampleNFT is ERC721Enumerable, Ownable {

    /// @dev Required to govern who can call certain functions

    /// @dev current max tokenId
    uint256 public tokenIdPointer;

    uint256 public constant maxSupply = 3333;
    uint256 public constant airdropCount = 473;
    uint256 public constant teamCount = 65;
    uint256 public constant publicCount = 2795;

    /// @dev base uri of NFT
    string private baseUri;

    /// @dev TokenID -> Post Creator address
    mapping(uint256 => address) public postCreators;

    /**
     @notice Constructor
     @param _baseUri Address of the NFT access control contract
     */
    constructor(string memory _baseUri) ERC721("Ant Mint Pass", "AMP") {
        baseUri = _baseUri;
    }

    /**
     @notice Mints a NFT AND when minting to a contract checks if the beneficiary is a 721 compatible
     @dev Only senders with either the admin or mintor role can invoke this method
     @param _beneficiary Recipient of the NFT
     @param _postCreator NFT Creator - will be required for issuing royalties from secondary sales
     @return uint256 The token ID of the token that was minted
     */
    function mint(address _beneficiary, address _postCreator) onlyOwner external returns (uint256) {
        require(_postCreator != address(0), "post creator cannot be address 0");
        require(tokenIdPointer < maxSupply, "3333 NFTs are all minted");

        tokenIdPointer = tokenIdPointer + 1;
        uint256 tokenId = tokenIdPointer;

        _safeMint(_beneficiary, tokenId);

        postCreators[tokenId] = _postCreator;

        return tokenId;
    }

    function mintMany(address _beneficiary, address _postCreator, uint256 _quantity) onlyOwner external {
        for(uint256 i = 0; i < _quantity ; i ++) {
            require(_postCreator != address(0), "post creator cannot be address 0");
            require(tokenIdPointer < maxSupply, "3333 NFTs are all minted");

            tokenIdPointer = tokenIdPointer + 1;
            uint256 tokenId = tokenIdPointer;

            _safeMint(_beneficiary, tokenId);

            postCreators[tokenId] = _postCreator;
        }
    }
    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return baseUri;
    }

    //////////
    // Admin /
    //////////

    /////////////////
    // View Methods /
    /////////////////

    /**
     @notice View method for checking whether a token has been minted
     @param _tokenId ID of the token being checked
     */
    function exists(uint256 _tokenId) external view returns (bool) {
        return _exists(_tokenId);
    }

    /**
     * @dev checks the given token ID is approved either for all or the single token ID
     */
    function isApproved(uint256 _tokenId, address _operator) public view returns (bool) {
        return isApprovedForAll(ownerOf(_tokenId), _operator) || getApproved(_tokenId) == _operator;
    }

}
